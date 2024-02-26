import {post} from "api/index";
import {AxiosError} from "axios";
import {ko} from "date-fns/locale";
import {Dispatch, SetStateAction, useState} from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

interface ProjectAddProps {
    userId: string;
    setProjects: React.Dispatch<React.SetStateAction<ProjectContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectAddForm({
    userId,
    setProjects,
    setIsAdd,
}: ProjectAddProps) {
    const [projectForm, setProjectForm] = useState({
        projTitle: "",
        projDetail: "",
        fromDate: new Date(),
        toDate: new Date(),
    });

    //date 설정
    //react-datePicker로 라이브러리 변경
    //날짜 언어 한국어로 변경하는 date-fns 설치 완료
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
            setIsAdd((prev) => !prev);
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
                <div className="projectAddFromDate">
                    <DatePicker
                        locale={ko}
                        selected={projectForm.fromDate}
                        onChange={(date: Date) =>
                            onDateChange(date, "fromDate")
                        }
                    />
                </div>
                <div className="projectAddToDate">
                    <DatePicker
                        locale={ko}
                        selected={projectForm.toDate}
                        onChange={(date: Date) => onDateChange(date, "toDate")}
                    />
                </div>

                <div className="projectAdd__btn__block">
                    <button className="projectAdd__btn" type="submit">
                        확인
                    </button>
                    <button
                        className="projectAdd__btn__cancel"
                        onClick={() => setIsAdd((prev) => !prev)}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
