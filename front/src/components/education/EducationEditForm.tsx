import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import { toast } from "react-toastify";

interface EducationFixProps {
    edu: EducationContentsProps;
    setEdu: React.Dispatch<React.SetStateAction<EducationContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EducationEditForm({
    edu,
    setEdu,
    setIsEdit,
}: EducationFixProps) {
    const [educationForm, setEducationForm] = useState({
        eduId: edu.eduId,
        school: edu.school,
        major: edu.major,
        degree: edu.degree,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;

        setEducationForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = edu.eduId;
        try {
            await put(`edu/${edu.eduId}`, {
                id,
                ...educationForm,
            });
            const EditedEducation = {
                id: id,
                eduId: educationForm.eduId,
                school: educationForm.school,
                major: educationForm.major,
                degree: educationForm.degree,
            };
            setEdu((prev) => {
                return prev.map((item) => {
                    if (item.eduId === EditedEducation.eduId)
                        return EditedEducation;
                    else return item;
                });
            });
            setIsEdit((prev) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="학교"
                        name="school"
                        value={educationForm.school}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="전공"
                        name="major"
                        value={educationForm.major}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="eduEditDegree__block">
                    <div className="eduEditDegree">
                        <label htmlFor="재학중">재학중</label>
                        <input
                            id="radio1"
                            type="radio"
                            name="degree"
                            value="재학중"
                            checked={educationForm.degree === "재학중"}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="eduAddDegree">
                        <label htmlFor="학사졸업">학사졸업</label>
                        <input
                            id="radio2"
                            type="radio"
                            name="degree"
                            value="학사졸업"
                            checked={educationForm.degree === "학사졸업"}
                            onChange={onChange}
                        />
                    </div>
                    <div className="eduAddDegree">
                        <label htmlFor="석사졸업">석사졸업</label>
                        <input
                            id="radio3"
                            type="radio"
                            name="degree"
                            value="석사졸업"
                            checked={educationForm.degree === "석사졸업"}
                            onChange={onChange}
                        />
                    </div>
                    <div className="eduAddDegree">
                        <label htmlFor="박사졸업">박사졸업</label>
                        <input
                            id="radio4"
                            type="radio"
                            name="degree"
                            value="박사졸업"
                            checked={educationForm.degree === "박사졸업"}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="flex space-x-3 mt-1">
                    <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-full" type="submit">
                        확인
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-full"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
