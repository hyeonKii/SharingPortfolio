import {put} from "api/index";
import {AxiosError} from "axios";
import {ko} from "date-fns/locale";
import {useState} from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
interface CertiFixProps {
    certificate: CertiContentsProps;
    setCertificates: React.Dispatch<React.SetStateAction<CertiContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CertiEditForm({
    certificate,
    setCertificates,
    setIsEdit,
}: CertiFixProps) {
    const [certiForm, setCertiForm] = useState({
        certiId: certificate.certiId,
        certiTitle: certificate.certiTitle,
        certiDetail: certificate.certiDetail,
        certiDate: new Date(certificate.certiDate),
    });

    //date 설정
    const onDateChange = (date: Date) => {
        setCertiForm((prev) => ({
            ...prev,
            certiDate: date,
        }));
    };

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
        const id = certificate.certiId;
        try {
            await put(`certi/${certificate.certiId}`, {
                id,
                ...certiForm,
            });
            const EditedCertificate = {
                id: id,
                certiId: certiForm.certiId,
                certiTitle: certiForm.certiTitle,
                certiDetail: certiForm.certiDetail,
                certiDate: certiForm.certiDate.toISOString().split("T")[0],
            };
            setCertificates((prev) => {
                return prev.map((item) => {
                    if (item.certiId === EditedCertificate.certiId)
                        return EditedCertificate;
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
            <form className="certi_editForm" onSubmit={handleSubmit}>
                <div className="certiEditTitle">
                    <input
                        type="text"
                        placeholder="자격증 이름"
                        name="certiTitle"
                        value={certiForm.certiTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="certiEditDetail">
                    <input
                        type="text"
                        placeholder="인증기관"
                        name="certiDetail"
                        value={certiForm.certiDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="certiEditDate">
                    <DatePicker
                        locale={ko}
                        selected={certiForm.certiDate}
                        onChange={onDateChange}
                    />
                </div>

                <div className="certiEdit__btn__block">
                    <button className="certiEdit__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="certiEdit__btn__cancel"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}