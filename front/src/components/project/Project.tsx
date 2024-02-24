import {useState} from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

export default function Project({
    project,
    setProjects,
    isEditable,
}: ProjectProps) {
    const [isEdit, setIsEdit] = useState(false);

    const toggleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <>
            {isEdit ? (
                <ProjectEditForm
                    project={project}
                    setProjects={setProjects}
                    setIsEdit={toggleEdit}
                />
            ) : (
                <ProjectCard
                    project={project}
                    setProjects={setProjects}
                    setIsEdit={toggleEdit}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
