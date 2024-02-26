import {put} from "api/index";
import {AxiosError} from "axios";
import {ko} from "date-fns/locale";
import {useState} from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

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
            <form className="project__addForm" onSubmit={handleSubmit}>
                <div className="projectAddTitle">
                    <input
                        type="text"
                        placeholder="프로젝트 제목"
                        name="projTitle"
                        value={projectForm.projTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="projectAddDetail">
                    <input
                        type="text"
                        placeholder="프로젝트 내용"
                        name="projDetail"
                        value={projectForm.projDetail}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="projectEditFromDate">
                    <DatePicker
                        locale={ko}
                        selected={projectForm.fromDate}
                        onChange={(date: Date) =>
                            onDateChange(date, "fromDate")
                        }
                    />
                </div>
                <div className="projectEditToDate">
                    <DatePicker
                        locale={ko}
                        selected={projectForm.toDate}
                        onChange={(date: Date) => onDateChange(date, "toDate")}
                    />
                </div>
                <div className="projectEdit__btn__block">
                    <button className="projectEdit__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="projectEdit__btn__cancel"
                        onClick={() => setIsEdit((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
