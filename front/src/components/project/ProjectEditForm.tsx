import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

export default function ProjectEditForm({
    project,
    setProjects,
    setIsEdit,
}: Pick<ProjectDetailProps, "project" | "setProjects" | "setIsEdit">) {
    const [projectForm, setProjectForm] = useState({
        projId: project.projId,
        projTitle: project.projTitle,
        projDetail: project.projDetail,
        fromDate: new Date(project.fromDate),
        toDate: new Date(project.toDate),
    });

    //date 설정
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
        const id = project.projId;
        try {
            await put(`project/${project.projId}`, {
                id,
                ...projectForm,
            });
            const EditedProject = {
                id: id,
                projId: projectForm.projId,
                projTitle: projectForm.projTitle,
                projDetail: projectForm.projDetail,
                fromDate: projectForm.fromDate.toISOString().split("T")[0],
                toDate: projectForm.toDate.toISOString().split("T")[0],
            };
            setProjects((prev) => {
                return prev.map((item) => {
                    if (item.projId === EditedProject.projId)
                        return EditedProject;
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
                            setIsEdit((prev) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
