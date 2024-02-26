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
        <header className="header">
            <Link to="/" className="header_logo">
                November
            </Link>
            <div>
                <Link to="/">Sharing Portfolio</Link>
                <Link to="/">나의 페이지</Link>
                <Link to="/network">네트워크</Link>
                {isLogin && <div onClick={logout}>로그아웃</div>}
            </div>
        </header>
    );
}
