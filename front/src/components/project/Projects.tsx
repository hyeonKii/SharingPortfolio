import {get} from "api/index";
import {useEffect, useState} from "react";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

export default function Projects({userId, isEditable}: OwnerProps) {
    const [projects, setProjects] = useState<ProjectContentsProps[]>([]);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        get("project", userId).then((res) => setProjects(res));
    }, [userId]);

    return (
        <>
            <div className="card__block">
                <div className="card_title">프로젝트 이력</div>
                {projects.map((project) => (
                    <Project
                        key={project.projId}
                        project={project}
                        setProjects={setProjects}
                        isEditable={isEditable}
                    />
                ))}
                {isAdd && (
                    <ProjectAddForm
                        userId={userId}
                        setProjects={setProjects}
                        setIsAdd={setIsAdd}
                    />
                )}
                {isEditable && (
                    <div className="projects__editBtn__block">
                        <button
                            className="projects__edit__btn"
                            onClick={() => setIsAdd(true)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
