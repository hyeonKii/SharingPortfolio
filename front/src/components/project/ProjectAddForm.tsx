import {post} from "api/index";
import {AxiosError} from "axios";
import {DateInventory} from "components/utils/DateInventory";
import {Dispatch, SetStateAction, useState} from "react";
import DatePicker from "tailwind-datepicker-react";
import {IOptions} from "tailwind-datepicker-react/types/Options";

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
    //이슈 존재 = date만 설정하거나 date range도 같이 설정해줄 수 있는 라이브러리 찾아야 한다.
    const {options, show, onClose} = DateInventory();

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
                console.log(e.message);
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
                    />
                </div>
                <div className="projectAddDetail">
                    <input
                        type="text"
                        placeholder="프로젝트 내용"
                        name="projDetail"
                        value={projectForm.projDetail}
                        onChange={onChange}
                    />
                </div>
                <div className="projectAddFromDate">
                    <DatePicker
                        options={options as IOptions}
                        show={show}
                        onChange={(date) => onDateChange(date, "fromDate")}
                        setShow={onClose}
                    />
                </div>
                {/* <div className="projectAddToDate">
                    <DatePicker
                        options={options as IOptions}
                        show={show}
                        onChange={(date) => onDateChange(date, "toDate")}
                        setShow={onClose}
                    />
                </div> */}

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
