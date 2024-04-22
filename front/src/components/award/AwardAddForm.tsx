import {post} from "api/index";
import {AxiosError} from "axios";
import {useState} from "react";
import {toast} from "react-toastify";

export default function AwardAddForm({
    userId,
    setAwards,
    setIsAdd,
}: Pick<AwardDetailProps, "userId" | "setAwards" | "setIsAdd">) {
    const [awardForm, setAwardForm] = useState({
        awardTitle: "",
        awardDetail: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        setAwardForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = userId;
        try {
            const res = await post("award/add", {
                id,
                ...awardForm,
            });
            setAwards((prev) => [...prev, res]);
            setIsAdd((prev: boolean) => !prev);
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
                        placeholder="수상내역"
                        name="awardTitle"
                        value={awardForm.awardTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-2 rounded-lg bg-white">
                    <input
                        type="text"
                        className="addEditForm__input"
                        placeholder="상세내용"
                        name="awardDetail"
                        value={awardForm.awardDetail}
                        onChange={onChange}
                        required
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
                            setIsAdd((prev: boolean) => !prev);
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </>
    );
}
