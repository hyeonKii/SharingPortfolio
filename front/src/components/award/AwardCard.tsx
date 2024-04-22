import {del} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export default function AwardCard({
    award,
    setAwards,
    setIsEdit,
    isEditable,
}: Omit<AwardDetailProps, "userId" | "setIsAdd">) {
    const handleDelete = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
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
                <div className="text-primary-700 font-medium">
                    수상명: {award.awardTitle}
                </div>
                <div className="text-primary-700 font-medium">
                    수상내용: {award.awardDetail}
                </div>
            </div>

            {isEditable && (
                <div className="flex-col min-w-[80px] space-y-1 pl-12">
                    <div>
                        <button
                            className="addEditForm__submit-btn"
                            onClick={() => setIsEdit((prev) => !prev)}
                        >
                            편집
                        </button>
                    </div>
                    <div>
                        <button
                            className="addEditForm__cancel-btn"
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
