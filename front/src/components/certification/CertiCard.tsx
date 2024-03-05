import {del} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

interface CertiCardProps {
    certificate: CertiContentsProps;
    setCertificates: React.Dispatch<React.SetStateAction<CertiContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

export default function CertiCard({
    certificate,
    setCertificates,
    setIsEdit,
    isEditable,
}: CertiCardProps) {
    const handleDelete = async () => {
        window.confirm("삭제하시겠습니까?");
        try {
            await del(`certi/${certificate.certiId}`);
            setCertificates((arr) => {
                const newArr = arr.filter(
                    (obj) => obj.certiId !== certificate.certiId
                );
                return newArr;
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <div className="flex items-center w-[260px] min-w-[250px] mt-3 p-1 mx-auto bg-indigo-100 rounded-lg shadow-xl">
            <div className="flex-col w-[150px] min-w-[150px] text-sm px-1">
                <div className="text-indigo-500 font-medium">
                    자격증: {certificate.certiTitle}
                </div>
                <div className="text-indigo-500 font-medium">
                    인증기관: {certificate.certiDetail}
                </div>
                <div className="text-indigo-500 font-medium">
                    취득일: {certificate.certiDate.split("T")[0]}
                </div>
            </div>
            {isEditable && (
                <div className="flex-col min-w-[80px] space-y-1 pl-12">
                    <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-0.5 px-2 rounded-lg"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        편집
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-0.5 px-2 rounded-lg"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
}
