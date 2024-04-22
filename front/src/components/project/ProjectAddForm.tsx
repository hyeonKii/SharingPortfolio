import {post} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

export default function ProjectAddForm({
    userId,
    setProjects,
    setIsAdd,
}: Pick<ProjectDetailProps, "userId" | "setProjects" | "setIsAdd">) {
    const [projectForm, setProjectForm] = useState({
        projTitle: "",
        projDetail: "",
        fromDate: new Date(),
        toDate: new Date(),
    });

    //date 설정
    //react-datePicker로 라이브러리 변경
    const onDateChange = (date: Date, name: string) => {
        setProjectForm((prev) => ({
            ...prev,
            [name]: date,
        }));
    };

    //전체 form 설정
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        setProjectForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = userId;
        try {
            const res = await post("project/add", {
                id,
                ...projectForm,
            });
            setProjects((prev) => [...prev, res]);
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
                        placeholder="프로젝트 제목"
                        name="projTitle"
                        value={projectForm.projTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="addEditForm__input"
                        placeholder="프로젝트 내용"
                        name="projDetail"
                        value={projectForm.projDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                        className="addEditForm__input"
                        selected={projectForm.fromDate}
                        onChange={(date: Date) =>
                            onDateChange(date, "fromDate")
                        }
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                        className="addEditForm__input"
                        selected={projectForm.toDate}
                        onChange={(date: Date) => onDateChange(date, "toDate")}
                    />
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
