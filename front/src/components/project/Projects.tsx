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
                <div className="flex flex-row items-center px-4">
                    <div className="w-24 h-8 mx-auto pt-0.5 bg-blue-400 rounded-full text-lg text-white font-bold text-center">
                        프로젝트
                    </div>
                    {isEditable && (
                        <div>
                            <button
                                className="w-8 h-8 pb-0.5 border border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
                                onClick={() => setIsAdd((prev) => !prev)}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
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
            </div>
        </>
    );
}
