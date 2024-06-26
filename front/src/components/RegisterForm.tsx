import {post} from "api";
import {AxiosError} from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useValid} from "./utils/valid";

export function RegisterForm() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    //useValid로 에러 문구 처리
    const {emailError, setEmailError, pwError, setPwError} = useValid();
    const [pwConfirmError, setPwConfirmError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        //name
        if (name === "userName") {
            setName(value);

            if (value?.length < 2) {
                setNameError("이름은 2글자 이상 입력해주세요.");
            } else {
                setNameError("");
            }
        }
        //email
        if (name === "email") {
            setEmail(value);
            const validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(validRegex)) {
                setEmailError("이메일 형식이 올바르지 않습니다.");
            } else {
                setEmailError("");
            }
        }
        //password
        if (name === "password") {
            setPassword(value);

            if (value?.length < 8) {
                setPwError("비밀번호는 8자리 이상으로 입력해주세요");
            } else if (
                confirmPassword?.length > 0 &&
                value !== confirmPassword
            ) {
                setPwError(
                    "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요."
                );
            } else {
                setPwError("");
            }
        }
        //confirmPassword
        if (name === "confirmPassword") {
            setConfirmPassword(value);

            if (value?.length < 8) {
                setPwConfirmError("비밀번호는 8자리 이상으로 입력해주세요");
            } else if (value !== password) {
                setPwConfirmError(
                    "비밀번호와 비밀번호 확인 값이 다릅니다."
                );
            } else {
                setPwConfirmError("");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await post("user/register", {
                email,
                password,
                name,
            });
            toast.success("회원가입이 완료되었습니다 :)");
            navigate("/login");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("회원가입에 실패했습니다");
            }
        }
    };

    return (
        <div
            id="register__wrap"
            className="signForm__wrap"
        >
            <div
                id="register__block"
                className="signForm__block"
            >
                <h2
                    id="form__title"
                    
                >
                    회원가입
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="userName"
                            className="signForm__label"
                        >
                            이름{" "}
                            {nameError && nameError.length > 0 && (
                                <span
                                    id="form__error"
                                    className="text-indigo-900"
                                >
                                    - {nameError}
                                </span>
                            )}
                        </label>
                        <input
                            className="signForm__input"
                            type="text"
                            name="userName"
                            id="userName"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="signForm__label"
                        >
                            이메일{" "}
                            {emailError && emailError.length > 0 && (
                                <span
                                    id="form__error"
                                    className="text-indigo-900"
                                >
                                    - {emailError}
                                </span>
                            )}
                        </label>
                        <input
                            className="signForm__input"
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="signForm__label"
                        >
                            비밀번호{" "}
                            {pwError && pwError.length > 0 && (
                                <span
                                    id="form__error"
                                    className="text-indigo-900"
                                >
                                    - {pwError}
                                </span>
                            )}
                        </label>
                        <input
                            className="signForm__input"
                            type="password"
                            name="password"
                            id="password"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="signForm__label"
                        >
                            비밀번호 확인{" "}
                            {pwConfirmError && pwConfirmError.length > 0 && (
                                <span
                                    id="form__error"
                                    className="text-indigo-900"
                                >
                                    - {pwConfirmError}
                                </span>
                            )}
                        </label>
                        <input
                            className="signForm__input"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center justify-around">
                        계정이 이미 있으신가요?
                        <Link
                            to="/login"
                            id="form__link"
                            className="text-sm font-medium text-primary-600 hover:underline"
                        >
                            로그인
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            value="회원가입"
                            id="form__btn-submit"
                            className="signForm__submitBtn"
                            disabled={pwConfirmError?.length > 0}
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
