import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import {toast} from "react-toastify";

interface AwardFixProps {
    award: AwardContentsProps;
    setAwards: React.Dispatch<React.SetStateAction<AwardContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AwardEditForm({
    award,
    setAwards,
    setIsEdit,
}: AwardFixProps) {
    const [awardForm, setAwardForm] = useState({
        awardId: award.awardId,
        awardTitle: award.awardTitle,
        awardDetail: award.awardDetail,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;

        setAwardForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = award.awardId;
        try {
            await put(`award/${award.awardId}`, {
                id,
                ...awardForm,
            });
            const EditedAward = {
                id: id,
                awardId: awardForm.awardId,
                awardTitle: awardForm.awardTitle,
                awardDetail: awardForm.awardDetail,
            };
            setAwards((prev) => {
                return prev.map((item) => {
                    if (item.awardId === EditedAward.awardId)
                        return EditedAward;
                    else return item;
                });
            });
            setIsEdit((prev) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form
                className="flex flex-col items-center mt-5"
                onSubmit={handleSubmit}
            >
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="수상내역"
                        name="awardTitle"
                        value={awardForm.awardTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="상세내용"
                        name="awardDetail"
                        value={awardForm.awardDetail}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="flex space-x-3 mt-1">
                    <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-full"
                        type="submit"
                    >
                        확인
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsEdit((prev) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
