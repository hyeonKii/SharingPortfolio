import {DispatchContext, UserStateContext} from "context/AuthContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function Header() {
    const navigate = useNavigate();

    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    const isLogin = !!userState?.user;

    const logout = () => {
        sessionStorage.removeItem("userToken");
        dispatch({type: "LOGOUT"});
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
                    <input type="checkbox"/>

                    {/* 네비게이션 바 모양 */}
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul className="menu">
                        <Link to="/">
                            <li>My Portfolio</li>
                        </Link>
                        <Link to="/network">
                            <li>Networking</li>
                        </Link>
                        {isLogin && (
                            <a>
                                <li onClick={logout}>Log Out</li>
                            </a>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
