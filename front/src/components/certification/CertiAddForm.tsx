import {post} from "api/index";
import {AxiosError} from "axios";
import {ko} from "date-fns/locale";
import {Dispatch, SetStateAction, useState} from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

interface CertiAddProps {
    userId: string;
    setCertificates: React.Dispatch<React.SetStateAction<CertiContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
}

export default function CertiAddForm({
    userId,
    setCertificates,
    setIsAdd,
}: CertiAddProps) {
    const [certiForm, setCertiForm] = useState({
        certiTitle: "",
        certiDetail: "",
        certiDate: new Date(),
    });

    //date 설정
    const onDateChange = (date: Date) => {
        setCertiForm((prev) => ({
            ...prev,
            certiDate: date,
        }));
    };

    //전체 form 설정
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        setCertiForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = userId;
        try {
            const res = await post("certi/add", {
                id,
                ...certiForm,
            });
            setCertificates((prev) => [...prev, res]);
            setIsAdd((prev) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form className="certi__addForm" onSubmit={handleSubmit}>
                <div className="certiAddTitle">
                    <input
                        type="text"
                        placeholder="자격증 이름"
                        name="certiTitle"
                        value={certiForm.certiTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="certiAddDetail">
                    <input
                        type="text"
                        placeholder="인증기관"
                        name="certiDetail"
                        value={certiForm.certiDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="certiAddDate">
                    <DatePicker
                        locale={ko}
                        selected={certiForm.certiDate}
                        onChange={onDateChange}
                    />
                </div>

                <div className="certiAdd__btn__block">
                    <button className="certiAdd__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="certiAdd__btn__cancel"
                        onClick={() => setIsAdd((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}