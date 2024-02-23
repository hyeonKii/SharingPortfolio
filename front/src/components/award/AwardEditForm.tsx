import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";

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
                    if (item.awardId === EditedAward.awardId) return EditedAward;
                    else return item;
                });
            });
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
                <div className="awardEditTitle">
                    <input
                        type="text"
                        placeholder="수상내역"
                        name="awardTitle"
                        value={awardForm.awardTitle}
                        onChange={onChange}
                    />
                </div>
                <div className="awardEditDetail">
                    <input
                        type="text"
                        placeholder="상세내용"
                        name="awardDetail"
                        value={awardForm.awardDetail}
                        onChange={onChange}
                    />
                </div>

                <div className="AwardEdit__btn__block">
                    <button className="AwardEdit__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="AwardEdit__btn__cancel"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
