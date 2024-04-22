import {post} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

export default function CertiAddForm({
    userId,
    setCertificates,
    setIsAdd,
}: Pick<CertiDetailProps, "userId" | "setCertificates" | "setIsAdd">) {
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
            setIsAdd((prev: boolean) => !prev);
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
                        className="addEditForm__input"
                        placeholder="자격증명"
                        name="certiTitle"
                        value={certiForm.certiTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="addEditForm__input"
                        placeholder="인증기관"
                        name="certiDetail"
                        value={certiForm.certiDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                        className="addEditForm__input"
                        selected={certiForm.certiDate}
                        onChange={onDateChange}
                    />
                </div>

                <div className="flex space-x-3 mt-1">
                    <button
                        className="addEditForm__submit-btn"
                        type="submit"
                    >
                        확인
                    </button>
                    <button
                        className="addEditForm__cancel-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsAdd((prev: boolean) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
