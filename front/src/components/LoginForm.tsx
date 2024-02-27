import {post} from "api";
import {AxiosError} from "axios";
import {DispatchContext} from "context/AuthContext";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if (name === "email") {
            setEmail(value);
            const vaildRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!value?.match(vaildRegex)) {
                setError("이메일 형식이 올바르지 않습니다.");
            } else {
                setError("");
            }
        }

        if (name === "password") {
            setPassword(value);

            if (password.length < 7) {
                setError("비밀번호는 8자리 이상 입력해주세요");
            } else {
                setError("");
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
            toast.success(`${user.name}님 반갑습니다 :)`);
            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("로그인에 실패했습니다.");
            }
        }
    };

    return (
        <div
            id="login__wrap"
            className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
            <h1 id="main__title" className="text-3xl text-white mb-5">sharing portfolio</h1>
            <div
                id="login__block"
                className="w-full h-3/5 bg-transparent backdrop-blur-3xl rounded-xl shadow-2xl md:mt-0 sm:max-w-md xl:p-0"
            >
                <h2
                    id="form__title"
                    className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 my-10 md:text-2xl"
                >
                    로그인
                </h2>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 ml-12"
                        >
                            이메일
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5 mx-auto"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ml-12"
                        >
                            비밀번호
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-4/5 p-2.5 mx-auto"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-around">
                        <div className="flex items-start">
                            계정이 없으신가요?
                        </div>
                        <Link
                            to="/register"
                            id="form__link"
                            className="text-sm font-medium text-primary-600 hover:underline"
                        >
                            회원가입하기
                        </Link>
                    </div>
                    {error && error.length > 0 && (
                        <div>
                            <div className="form__error">{error}</div>
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            id="form__btn__submit"
                            className="w-4/5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-12 mt-1"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
