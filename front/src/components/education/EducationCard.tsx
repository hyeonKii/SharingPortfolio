import {del} from "api/index";
import {AxiosError} from "axios";
import { toast } from "react-toastify";

interface EduCardProps {
    edu: EducationContentsProps;
    setEdu: React.Dispatch<React.SetStateAction<EducationContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

export default function EducationCard({
    edu,
    setEdu,
    setIsEdit,
    isEditable
}: EduCardProps) {
    const handleDelete = async () => {
        window.confirm("삭제하시겠습니까?");
        try {
            await del(`edu/${edu.eduId}`);
            setEdu((arr) => {
                const newArr = arr.filter((obj) => obj.eduId !== edu.eduId);
                return newArr;
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <div className="eduCard__block">
            <div className="eduSchool">{edu.school}</div>
            <div className="eduDegree">{edu.major} ({edu.degree})</div>
            {isEditable && (
                <div className="edu__btn__block">
                    <button onClick={() => setIsEdit((prev) => !prev)}>
                        편집
                    </button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
        </div>
    );
}
