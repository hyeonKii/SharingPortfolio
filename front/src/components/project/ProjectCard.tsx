import {del} from "api/index";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

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
            <div className="flex items-center w-[260px] min-w-[250px] mt-3 p-1 mx-auto bg-indigo-100 rounded-lg shadow-xl">
                <div className="flex-col w-[150px] min-w-[150px] text-sm px-1">
                    <div className="text-indigo-500 font-medium">
                        이름: {project.projTitle}
                    </div>
                    <div className="text-indigo-500 font-medium">
                        내용: {project.projDetail}
                    </div>
                    <div className="text-indigo-500 font-medium">기간</div>
                    <div className="text-[10px] text-indigo-500 font-medium">{`${
                        project.fromDate.split("T")[0]
                    } - ${project.toDate.split("T")[0]}`}</div>
                </div>
                {isEditable && (
                    <div className="flex-col min-w-[80px] space-y-1 pl-12">
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-0.5 px-2 rounded-lg"
                            onClick={() => setIsEdit((prev) => !prev)}
                        >
                            편집
                        </button>
                        <button
                            className="bg-red-300 hover:bg-red-400 text-white font-medium py-0.5 px-2 rounded-lg"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
