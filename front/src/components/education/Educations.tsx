import {get} from "api/index";
import {useEffect, useState} from "react";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

export default function Educations({userId, isEditable}: OwnerProps) {
    const [educations, setEducations] = useState<EducationContentsProps[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        get("edu", userId).then((educationList) => {
            setEducations(educationList);
        });
    }, [userId]);

    return (
        <>
            <div className="card__block">
                <div className="card__title">학력</div>
                {educations.map((education) => (
                    <Education
                        key={education.eduId}
                        edu={education}
                        isEditable={isEditable}
                        setEdu={setEducations}
                    />
                ))}
                {isAdd && (
                    <EducationAddForm
                        userId={userId}
                        setIsAdd={setIsAdd}
                        setEdu={setEducations}
                    />
                )}
                {isEditable && (
                    <div className="educations__editBtn__block">
                        <button
                            className="educations__edit__btn"
                            onClick={() => setIsAdd(true)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
