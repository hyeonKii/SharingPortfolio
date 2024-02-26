import {del} from "api/index";
import {AxiosError} from "axios";
import { toast } from "react-toastify";

interface ProjectCardProps {
    project: ProjectContentsProps;
    setProjects: React.Dispatch<React.SetStateAction<ProjectContentsProps[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

export default function ProjectCard({
    project,
    setProjects,
    setIsEdit,
    isEditable,
}: ProjectCardProps) {
    const handleDelete = async () => {
        window.confirm("삭제하시겠습니까?");
        try {
            await del(`project/${project.projId}`);
            setProjects((arr) => {
                const newArr = arr.filter(
                    (obj) => obj.projId !== project.projId
                );
                return newArr;
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.message);
            }
        }
    };
    return (
        <>
            <div className="projectCard__block">
                <div className="projectTitle">{project.projTitle}</div>
                <div className="projectDetail">{project.projDetail}</div>
                <div className="projectDate">{`${
                    project.fromDate.split("T")[0]
                } ~ ${project.toDate.split("T")[0]}`}</div>
                {isEditable && (
                    <div className="project__btn__block">
                        <button onClick={() => setIsEdit((prev) => !prev)}>
                            편집
                        </button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
        </>
    );
}
