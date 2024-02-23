import {del} from "api/index";
import {AxiosError} from "axios";

interface AwardCardProps {
    award: AwardContentsProps;
    setAwards: React.Dispatch<React.SetStateAction<AwardContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

export default function AwardCard({
    award,
    setAwards,
    setIsEdit,
    isEditable,
}: AwardCardProps) {
    const handleDelete = async () => {
        window.confirm("삭제하시겠습니까?");
        try {
            await del(`award/${award.awardId}`);
            setAwards((arr) => {
                const newArr = arr.filter(
                    (obj) => obj.awardId !== award.awardId
                );
                return newArr;
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.message);
            }
        }
    };
    return (
        <div className="AwardCard__block">
            <div className="awardTitle">{award.awardTitle}</div>
            <div className="awardDetail">{award.awardDetail}</div>
            {isEditable && (
                <div className="Award__btn__block">
                    <button onClick={() => setIsEdit((prev) => !prev)}>
                        편집
                    </button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
        </div>
    );
}
