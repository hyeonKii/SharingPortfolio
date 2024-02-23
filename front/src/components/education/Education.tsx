import { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

export default function Education({edu, setEdu, isEditable}: EducationProps) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
};
    return (
      <>
        {!isEdit ? (
          <EducationCard
            edu={edu}
            setIsEdit={toggleEdit}
            isEditable={isEditable}
            setEdu={setEdu}
          />
        ) : (
          <EducationEditForm
            edu={edu}
            setIsEdit={toggleEdit}
            setEdu={setEdu}
          />
        )}
      </>
    );
}
