import {del} from "api/index";
import {AxiosError} from "axios";

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
                console.log(e.message);
            }
        }
    };

    //테스트용
    console.log(certificate.certiDate);

    return (
        <div className="certiCard__block">
            <div className="certiTitle">{certificate.certiTitle}</div>
            <div className="certiDetail">{certificate.certiDetail}</div>
            <div className="certiDate">{certificate.certiDate.split("T")[0]}</div>
            {isEditable && (
                <div className="award__btn__block">
                    <button onClick={() => setIsEdit((prev) => !prev)}>
                        편집
                    </button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
        </div>
    );
}
