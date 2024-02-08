import {post} from "api";
import { DispatchContext } from "../App";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";

export function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if (name === email) {
            setEmail(value);
            const vaildRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(vaildRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }

            if (name === password) {
                setPassword(value);

                if (password.length < 8) {
                    setError("비밀번호는 8자리 이상 입력해주세요");
                } else {
                    setError("");
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await post("user/login", {
                email,
                password,
            });
            const jwtToken = user.token;
            sessionStorage.setItem("userToken", jwtToken);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });
            navigate("/");
        } catch (error) {
            if (error instanceof Error) alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>로그인</h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
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
                    value={password}
                    required
                    onChange={onChange}
                />
            </div>
            <div className="form__block">
                계정이 없으신가요?
                <Link to="/register" className="form__link">
                    회원가입하기
                </Link>
            </div>
            {error && error.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                <input
                    type="submit"
                    value="로그인"
                    className="form__btn-submit"
                />
            </div>
        </form>
    );
}
