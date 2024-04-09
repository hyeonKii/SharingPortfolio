import {UserStateContext} from "context/AuthContext";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {FaUserEdit} from "react-icons/fa";

export default function UserCard({user, setIsEdit, isEditable}: UserCardProps) {
    const userState = useContext(UserStateContext);

    const completedEdit = setIsEdit as React.Dispatch<
        React.SetStateAction<boolean>
    >;

    return (
        <>
            <div className="flex flex-col items-center mt-5">
                <img
                    className="w-28 h-28 rounded-full"
                    src={`${import.meta.env.VITE_BASE_URL}/${user?.profileImageFilename}`}
                    alt="사용자 등록 프로필 이미지"
                />
                <div className="mt-5 mb-1 text-xl text-indigo-600 font-bold">
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
                            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-full"
                            onClick={() => completedEdit(true)}
                        >
                            {/* 편집 */}
                            <FaUserEdit className="w-5 h-5 mx-1 text-center" />
                        </button>
                    </div>
                )}
                {user?.id !== userState?.user?.id && (
                    <div className="my-2 text-xs text-blue-700 underline">
                        <Link to={`/users/${user?.id}`}>
                            포트폴리오 탐색
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
