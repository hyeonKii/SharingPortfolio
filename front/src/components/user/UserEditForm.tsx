import {put} from "api/index";
import {useState} from "react";
import {upload} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export default function UserEditForm({
    user,
    setIsEdit,
    setUser,
}: Omit<UserDetailProps, "isEditable">) {
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <picture>
                        <source srcSet={`${previewImg}`} type="image/webp" />
                        <img
                            loading="lazy"
                            decoding="async"
                            className="w-28 h-28 rounded-full"
                            src={`${previewImg}`}
                            alt="사용자 업로드 프로필 이미지"
                        />
                    </picture>
                ) : (
                    <picture>
                        <source
                            srcSet={`${import.meta.env.VITE_BASE_URL}${
                                user?.profileImageFilename
                            }`}
                            type="image/webp"
                        />
                        <img
                            loading="lazy"
                            decoding="async"
                            className="w-28 h-28 rounded-full"
                            src={`${import.meta.env.VITE_BASE_URL}${
                                user?.profileImageFilename
                            }`}
                            alt="사용자 등록 프로필 이미지"
                        />
                    </picture>
                )}
                <label id="upload_label" className="flex mx-auto">
                    <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:my-2.5 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-600 "
                        onChange={(e) => uploadImage(e)}
                    />
                </label>

                <div id="edit_name" className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={onChange}
                        className="bg-transparent h-7 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="이름"
                        required
                    />
                </div>

                <div id="edit_email" className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        id="email"
                        value={email}
                        className="bg-transparent h-7 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        onChange={onChange}
                        placeholder="이메일"
                        required
                    />
                </div>

                <div id="edit_description" className="mb-2 rounded-lg bg-white">
                    <input
                        id="description"
                        value={description}
                        className="bg-transparent h-7 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        onChange={onChange}
                        placeholder="직업 설명"
                        required
                    />
                </div>

                <div className="flex space-x-3 mt-1">
                    <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-full"
                        type="submit"
                    >
                        확인
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsEdit((prev) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
