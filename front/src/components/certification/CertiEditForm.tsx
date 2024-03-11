import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
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
            <form
                className="flex flex-col items-center mt-5"
                onSubmit={handleSubmit}
            >
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="자격증 이름"
                        name="certiTitle"
                        value={certiForm.certiTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="인증기관"
                        name="certiDetail"
                        value={certiForm.certiDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        selected={certiForm.certiDate}
                        onChange={onDateChange}
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
