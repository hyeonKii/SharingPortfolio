import {del} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

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
    isEditable,
}: EduCardProps) {
    const handleDelete = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
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
        } else {
            return;
        }
    };

    return (
        <div className="flex items-center w-[260px] min-w-[250px] mt-3 p-1 mx-auto bg-indigo-100 rounded-lg shadow-xl">
            <div className="flex-col w-[150px] min-w-[150px] text-sm px-1">
                <div className="text-indigo-500 font-medium">
                    학교: {edu.school}
                </div>
                <div className="text-indigo-500 font-medium">
                    전공: {edu.major}
                </div>
                <div className="text-indigo-500 font-medium">
                    졸업구분: {edu.degree}
                </div>
            </div>

            {isEditable && (
                <div className="flex-col min-w-[80px] space-y-1 pl-12">
                    <div>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-0.5 px-2 rounded-lg"
                            onClick={() => setIsEdit((prev) => !prev)}
                        >
                            편집
                        </button>
                    </div>
                    <div>
                        <button
                            className="bg-red-300 hover:bg-red-400 text-white font-medium py-0.5 px-2 rounded-lg"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
