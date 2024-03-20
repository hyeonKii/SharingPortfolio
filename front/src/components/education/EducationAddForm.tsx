import {post} from "api/index";
import {AxiosError} from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {toast} from "react-toastify";

interface EducationAddProps {
    userId: string;
    setEdu: React.Dispatch<React.SetStateAction<EducationContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
}

export default function EducationAddForm({
    userId,
    setIsAdd,
    setEdu,
}: EducationAddProps) {
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
            setIsAdd((prev) => !prev);
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
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
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
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
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
                        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-full"
                        type="submit"
                    >
                        확인
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsAdd((prev) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
