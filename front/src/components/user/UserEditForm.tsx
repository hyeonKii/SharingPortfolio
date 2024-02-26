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
            <form onSubmit={handleSubmit}>
                {previewImg ? (
                    <img
                        style={{width: "10rem", height: "8rem"}}
                        src={`${previewImg}`}
                        alt="사용자 업로드 프로필 이미지"
                    />
                ) : (
                    <img
                        style={{width: "10rem", height: "8rem"}}
                        src={`http://localhost:5001/${user?.profileImageFilename}`}
                        alt="사용자 등록 프로필 이미지"
                    />
                )}
                <input type="file" onChange={(e) => uploadImage(e)} />
                <input type="text" id="name" value={name} onChange={onChange} />
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={onChange}
                />
                <input
                    type="text"
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
