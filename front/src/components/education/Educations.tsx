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
            <div className="education__card">
                <div className="education__tile">학력</div>
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
                    <div className="education__editBtn__block">
                        <button
                            className="education__edit__btn"
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
