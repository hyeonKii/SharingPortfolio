import {useState} from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";

export default function Award({
    award,
    setAwards,
    isEditable,
}: Pick<AwardDetailProps, "award" | "setAwards" | "isEditable">) {
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <>
            {isEdit ? (
                <AwardEditForm
                    award={award}
                    setAwards={setAwards}
                    setIsEdit={toggleEdit}
                />
            ) : (
                <AwardCard
                    award={award}
                    setAwards={setAwards}
                    setIsEdit={toggleEdit}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
