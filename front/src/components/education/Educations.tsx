import {get} from "api/index";
import {useEffect, useState} from "react";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";
// import {ModalContext} from "context/ModalContext";
// import {Modal} from "components/Modal";

export default function Educations({userId, isEditable}: OwnerProps) {
    const [educations, setEducations] = useState<EducationContentsProps[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    // const {openModal} = useContext(ModalContext);

    useEffect(() => {
        get("edu", userId).then((educationList) => {
            setEducations(educationList);
        });
    }, [userId]);

    return (
        <>
            <div className="card__block">
                <div className="flex flex-row items-center px-4">
                    <div className="w-24 h-8 mx-auto pt-0.5 bg-blue-400 rounded-full text-lg text-white font-bold text-center">
                        학력
                    </div>
                    {isEditable && (
                        <div>
                            <button
                                className="w-8 h-8 pb-0.5 border border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
                                onClick={() => setIsAdd((prev) => !prev)}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
                {educations.map((education) => (
                    <Education
                        key={education.eduId}
                        edu={education}
                        isEditable={isEditable}
                        setEdu={setEducations}
                    />
                ))}
                {isAdd && (
                    // <Modal openModal={openModal}>
                    <EducationAddForm
                        userId={userId}
                        setIsAdd={setIsAdd}
                        setEdu={setEducations}
                    />
                    // </Modal>
                )}
            </div>
        </>
    );
}
