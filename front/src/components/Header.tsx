import { UserStateContext} from "context/AuthContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function Header() {
    const navigate = useNavigate();

    const {user, dispatch} = useContext(UserStateContext);

    const isLogin = !!user;

    const logout = () => {
        sessionStorage.removeItem("userToken");
        dispatch({type: "LOGOUT", payload: null});
        toast.success("로그아웃 되었습니다!");
        navigate("/");
    };

    return (
        <>
            <div className="flex justify-between items-center h-[60px] backdrop-blur-3xl shadow-2xl">
                <div>
                    <Link to="/">
                        <span className="text-xl text-white pl-5 ">
                            Sharing Portfolio
                        </span>
                    </Link>
                </div>

                <div className="menuToggle">
                    {/* 트리거 */}
                    <label htmlFor="menuToggle" />
                    <input type="checkbox" id="menuToggle" />

                    {/* 네비게이션 바 모양 */}
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul className="menu">
                        <li>
                            <Link to="/">My Portfolio</Link>
                        </li>

                        <li>
                            <Link to="/network">Networking</Link>
                        </li>

                        {isLogin && (
                            <li>
                                <a onClick={logout}>Log Out</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
