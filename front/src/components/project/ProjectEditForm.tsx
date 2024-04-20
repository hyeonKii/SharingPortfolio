import {put} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

interface ProjectFixProps {
    project: ProjectContentsProps;
    setProjects: React.Dispatch<React.SetStateAction<ProjectContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProjectEditForm({
    project,
    setProjects,
    setIsEdit,
}: ProjectFixProps) {
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
            <form className="flex flex-col items-center mt-5" onSubmit={handleSubmit}>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
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
                        className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        placeholder="프로젝트 내용"
                        name="projDetail"
                        value={projectForm.projDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                    className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        selected={projectForm.fromDate}
                        onChange={(date: Date) =>
                            onDateChange(date, "fromDate")
                        }
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <DatePicker
                    className="bg-transparent h-6 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                        selected={projectForm.toDate}
                        onChange={(date: Date) => onDateChange(date, "toDate")}
                    />
                </div>
                <div className="flex space-x-3 mt-1">
                    <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-full" type="submit">
                        확인
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-400 text-white font-medium py-1 px-3 rounded-full"
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
