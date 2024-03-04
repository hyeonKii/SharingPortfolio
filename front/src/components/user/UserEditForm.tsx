import {put} from "api/index";
import {useState} from "react";
import {upload} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export default function UserEditForm({
    user,
    setIsEdit,
    setUser,
}: UserEditProps) {
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [description, setDescription] = useState(user?.description);
    const [profileImageFilename, setProfileImageFileName] = useState(
        user?.profileImageFilename
    );

    //이미지 프리뷰
    const [previewImg, setPreviewImg] = useState("");
    const setPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList;
        setPreviewImg(URL.createObjectURL(files[0]));
    };

    //이미지 업로드
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const files = e.target.files as FileList;
        formData.append("file", files[0]);

        const res = await upload(`user/profile`, `${user?.id}`, formData);
        const uploadedImage = await res?.data;

        setProfileImageFileName(uploadedImage);
        setPreviewImage(e);
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: {id, value},
        } = e;

        if (id === "name") {
            setName(value);
        }

        if (id === "email") {
            setEmail(value);
        }

        if (id === "description") {
            setDescription(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const updatedUser = await put(`users/${user?.id}`, {
                name,
                email,
                description,
                profileImageFilename,
            });
            setUser(updatedUser);
            setIsEdit((prev) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form
                className="flex flex-col items-center mt-5"
                onSubmit={handleSubmit}
            >
                {previewImg ? (
                    <img
                        className="w-28 h-28 rounded-full"
                        src={`${previewImg}`}
                        alt="사용자 업로드 프로필 이미지"
                    />
                ) : (
                    <img
                        className="w-28 h-28 rounded-full"
                        src={`http://localhost:5001/${user?.profileImageFilename}`}
                        alt="사용자 등록 프로필 이미지"
                    />
                )}
                <label className="block mx-auto">
                    <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mx-4 file:my-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-600 "
                        onChange={(e) => uploadImage(e)}
                    />
                </label>

                <input type="text" id="name" value={name} onChange={onChange} />
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={onChange}
                />
                <textarea
                    id="description"
                    value={description}
                    onChange={onChange}
                />
                <div className="userEdit__btn__block">
                    <button className="userEdit__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="userEdit__btn__cancel"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
