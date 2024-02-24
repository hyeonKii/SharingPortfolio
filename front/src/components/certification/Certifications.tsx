import {get} from "api/index";
import {useEffect, useState} from "react";
import Certification from "./Certification";
import CertiAddForm from "./CertiAddForm";

export default function Certifications({userId, isEditable}: OwnerProps) {
    const [certificates, setCertificates] = useState<CertiContentsProps[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        get("certi", userId).then((res) => setCertificates(res));
    }, [userId]);

    return (
        <div className="card__block">
            <div className="card_title">자격증</div>
            {certificates.map((certificate) => (
                <Certification
                    key={certificate.certiId}
                    certificate={certificate}
                    setCertificates={setCertificates}
                    isEditable={isEditable}
                />
            ))}
            {isAdd && (
                <CertiAddForm
                    userId={userId}
                    setCertificates={setCertificates}
                    setIsAdd={setIsAdd}
                />
            )}
            {isEditable && (
                <div className="awards__editBtn__block">
                    <button
                        className="awards__edit__btn"
                        onClick={() => setIsAdd(true)}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
