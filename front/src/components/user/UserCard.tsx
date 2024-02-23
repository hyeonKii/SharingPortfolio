export default function UserCard({
    user,
    setIsEdit,
    isEditable,
}: UserCardProps) {
    return (
        <>
            <div className="card__block">
                <img
                    className="card__image"
                    src={`http://localhost:5001/${user?.profileImageFilename}`}
                    alt="사용자 등록 프로필 이미지"
                />
                <div className="card__title">{user?.name}</div>
                <div className="card__email">{user?.email}</div>
                <div className="card__description">{user?.description}</div>
                {isEditable && (
                    <div className="card__edit__block">
                        <button
                            className="card__edit__btn"
                            onClick={() => setIsEdit(true)}
                        >
                            편집
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
