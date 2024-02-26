import {post} from "api/index";
import {AxiosError} from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import { toast } from "react-toastify";

interface AwardAddProps {
    userId: string;
    setAwards: React.Dispatch<React.SetStateAction<AwardContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
}

export default function AwardAddForm({
    userId,
    setAwards,
    setIsAdd,
}: AwardAddProps) {
    const [awardForm, setAwardForm] = useState({
        awardTitle: "",
        awardDetail: "",
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
        const id = userId;
        try {
            const res = await post("award/add", {
                id,
                ...awardForm,
            });
            setAwards((prev) => [...prev, res]);
            setIsAdd((prev) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form className="award__addForm" onSubmit={handleSubmit}>
                <div className="awardAddTitle">
                    <input
                        type="text"
                        placeholder="수상내역"
                        name="awardTitle"
                        value={awardForm.awardTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="awardAddDetail">
                    <input
                        type="text"
                        placeholder="상세내용"
                        name="awardDetail"
                        value={awardForm.awardDetail}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="awardAdd__btn__block">
                    <button className="awardAdd__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="awardAdd__btn__cancel"
                        onClick={() => setIsAdd((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}