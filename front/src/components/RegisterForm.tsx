import {post} from "api";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export function RegisterForm() {
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {id, value},
        } = e;
        //email
        if (id === "email") {
            setEmail(value);
            const validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }
        }
        //password
        if (id === "password") {
            setPassword(value);

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요");
            } else if (
                confirmPassword?.length > 0 &&
                value !== confirmPassword
            ) {
                setError(
                    "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요."
                );
            } else {
                setError("");
            }
        }
        //confirmPassword
        if (id === "confirmPassword") {
            setConfirmPassword(value);

            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상으로 입력해주세요");
            } else if (value !== password) {
                setError(
                    "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요."
                );
            } else {
                setError("");
            }
        }
        //name
        setName(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await post("user/register", {
                email,
                password,
                name,
            });

            navigate;
        } catch (error) {
            if (error instanceof Error) {
                console.log("회원가입에 실패했습니다", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="form__title">회원가입</h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={onChange}
                />
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={onChange}
                />
            </div>
            <div className="form__block">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    onChange={onChange}
                />
            </div>
            {error && error.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 이미 있으신가요?
                <Link to="/login" className="form__link">
                    로그인
                </Link>
            </div>
            <div className="form__block">
                <input
                    type="submit"
                    value="회원가입"
                    className="form__btn-submit"
                    disabled={error?.length > 0}
                />
            </div>
        </form>
    );
}
