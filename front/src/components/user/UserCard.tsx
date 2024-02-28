import {UserStateContext} from "context/AuthContext";
import {useContext} from "react";
import {Link} from "react-router-dom";

export default function UserCard({user, setIsEdit, isEditable}: UserCardProps) {
    const userState = useContext(UserStateContext);

    const completedEdit = setIsEdit as React.Dispatch<
        React.SetStateAction<boolean>
    >;

    return (
        <>
            <div className="card__block">
                <img
                    className="card__image"
                    src={`http://localhost:5001/${user?.profileImageFilename}`}
                    alt="사용자 등록 프로필 이미지"
                    style={{
                        width: "7rem",
                        height: "7rem",
                        borderRadius: "10px",
                    }}
                />
                <div className="card__title">{user?.name}</div>
                <div className="card__email">{user?.email}</div>
                <div className="card__description">{user?.description}</div>
                {isEditable && (
                    <div className="card__edit__block">
                        <button
                            className="card__edit__btn"
                            onClick={() => completedEdit(true)}
                        >
                            편집
                        </button>
                    </div>
                )}
                {user?.id === userState?.user?.id ? (
                    <Link to={`/users/${user?.id}`}>내 포트폴리오 이동</Link>
                ) : (
                    <Link to={`/users/${user?.id}`}>포트폴리오 탐색하기</Link>
                )}
            </div>
        </>
    );
}
