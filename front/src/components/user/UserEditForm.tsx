import {put} from "api/index";
import {useState} from "react";
import {upload} from "api/index";
import {AxiosError} from "axios";

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

    const [fileprevImage, setFileprevImage] = useState("");
    const setFilepreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList;

        //test = blob:http://localhost:3005/2cc62be5-c0f9-472e-8b8b-3192b5df16c9
        console.log(URL.createObjectURL(files[0]));

        setFileprevImage(URL.createObjectURL(files[0]));
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const files = e.target.files as FileList;
        formData.append("file", files[0]);

        //test = 아직 확인 중
        console.table(...formData);

        const res = await upload(`user/profile/`, `${user?.id}`, formData);
        const impageUpload = await res?.data;

        console.log(impageUpload);

        setProfileImageFileName(impageUpload);
        setFilepreviewImage(e);
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
                console.log(e.message);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {fileprevImage ? (
                    <img
                        style={{width: "10rem", height: "8rem"}}
                        src={`${fileprevImage}`}
                        alt="사용자 업로드 프로필 이미지"
                    />
                ) : (
                    <img
                        style={{width: "10rem", height: "8rem"}}
                        src={`http://localhost:5001/${user?.profileImageFilename}`}
                        alt="사용자 등록 프로필 이미지"
                    />
                )}
                <input
                    type="file"
                    formMethod="post"
                    formEncType="multi/form-data"
                    onChange={(e) => uploadImage(e)}
                />
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
