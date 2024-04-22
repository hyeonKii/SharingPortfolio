import {UserStateContext} from "context/AuthContext";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {FaUserEdit, FaRegUserCircle} from "react-icons/fa";

export default function UserCard({
    user,
    setIsEdit,
    isEditable,
}: Pick<UserDetailProps, "user" | "setIsEdit" | "isEditable">) {
    const userState = useContext(UserStateContext);

    return (
        <>
            <div className="flex flex-col items-center mt-5">
                {user?.profileImageFilename ? (
                    <picture>
                        <source
                            srcSet={`${import.meta.env.VITE_BASE_URL}${
                                user?.profileImageFilename
                            }`}
                            type="image/webp"
                        />
                        {user?.profileImageFilename && (
                            <img
                                className="w-28 h-28 rounded-full"
                                src={`${import.meta.env.VITE_BASE_URL}${
                                    user?.profileImageFilename
                                }`}
                                alt="사용자 등록 프로필 이미지"
                            />
                        )}
                    </picture>
                ) : (
                    <FaRegUserCircle className="w-28 h-28" />
                )}

                <div className="mt-5 mb-1 text-xl text-primary-600 font-bold">
                    {user?.name}
                </div>
                <div className="mb-1 text-sm font-medium text-gray-700">
                    {user?.email}
                </div>
                <div className="w-2/3 text-xs text-gray-700 text-center">
                    {user?.description}
                </div>
                {isEditable && (
                    <div>
                        <button
                            type="button"
                            className="w-20 mt-7 my-auto p-2 text-sm text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-800 "
                            onClick={() => setIsEdit((prev) => !prev)}
                        >
                            <span>
                                <FaUserEdit className="inline w-5 h-5 mx-1" />
                                편집
                            </span>
                        </button>
                    </div>
                )}
                {user?.id !== userState?.user?.id && (
                    <div className="my-2 text-xs text-blue-700 underline">
                        <Link to={`/users/${user?.id}`}>포트폴리오 탐색</Link>
                    </div>
                )}
            </div>
        </>
    );
}
