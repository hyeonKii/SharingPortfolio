import {post} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import {toast} from "react-toastify";

export default function EducationAddForm({
    userId,
    setIsAdd,
    setEdu,
}: Pick<EduDetailProps, "userId" | "setIsAdd" | "setEdu">) {
    const [educationForm, setEducationForm] = useState({
        school: "",
        major: "",
        degree: "재학중",
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

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEducationForm((prev) => ({
            ...prev,
            degree: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = userId;
        try {
            const res = await post("edu/add", {
                id,
                ...educationForm,
            });
            setEdu((prev) => [...prev, res]);
            setIsAdd((prev: boolean) => !prev);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };

    return (
        <>
            <form
                className="flex flex-col items-center mt-5"
                onSubmit={handleSubmit}
            >
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="addEditForm__input"
                        placeholder="학교"
                        name="school"
                        value={educationForm.school}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="addEditForm__input"
                        placeholder="전공"
                        name="major"
                        value={educationForm.major}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <select onChange={onSelectChange} className="w-full h-6 rounded-lg ring-2 px-3 mr-3 ring-indigo-400 focus:ring-sky-600 focus:outline-none">
                        <option disabled selected>
                            학위를 골라주세요
                        </option>
                        <option value="재학중">재학중</option>
                        <option value="학사졸업">학사졸업</option>
                        <option value="석사졸업">석사졸업</option>
                        <option value="박사졸업">박사졸업</option>
                    </select>
                </div>
                <div className="flex space-x-3 mt-1">
                    <button
                        className="addEditForm__submit-btn"
                        type="submit"
                    >
                        확인
                    </button>
                    <button
                        className="addEditForm__cancel-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsAdd((prev: boolean) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
