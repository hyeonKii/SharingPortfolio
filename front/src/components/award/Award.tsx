import {useState} from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";

export default function Award({award, setAwards, isEditable}: AwardProps) {
    const [isEdit, setIsEdit] = useState(false);

    const toogleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <>
            {isEdit ? (
                <AwardEditForm
                    award={award}
                    setAwards={setAwards}
                    setIsEdit={toogleEdit}
                />
            ) : (
                <AwardCard
                    award={award}
                    setAwards={setAwards}
                    setIsEdit={toogleEdit}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
