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
            <div className="flex flex-row items-center px-4">
                <div className="cards__title">
                    자격증
                </div>
                {isEditable && (
                    <div>
                        <button
                            className="w-8 h-8 pb-0.5 border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
                            onClick={() => setIsAdd((prev) => !prev)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
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
        </div>
    );
}
