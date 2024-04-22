import {useState} from "react";
import CertiCard from "./CertiCard";
import CertiEditForm from "./CertiEditForm";

export default function Certification({
    certificate,
    setCertificates,
    isEditable,
}: Pick<CertiDetailProps, "certificate" | "setCertificates" | "isEditable">) {
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <>
            {isEdit ? (
                <CertiEditForm
                    certificate={certificate}
                    setCertificates={setCertificates}
                    setIsEdit={toggleEdit}
                />
            ) : (
                <CertiCard
                    certificate={certificate}
                    setCertificates={setCertificates}
                    setIsEdit={toggleEdit}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
