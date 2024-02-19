import {get} from "api/index";
// import {AxiosError} from "axios";
import {UserStateContext} from "context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export function Portfolio() {
    const navigate = useNavigate();
    const params = useParams();

    const userState = useContext(UserStateContext);

    const [userInfo, setUserInfo] = useState<UserProps>({});
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchedUser = async (ownerId: string) => {
        // userToken이 없는 문제는 api 호출 문제였다.
        // api 호출이 잘못되서 authorization 에 토큰이 제대로 적재되지 않았다.
        // 그 이유는 추후에 알아볼 것
        const res = await get("users", ownerId);
        const userData = res.data;
        setUserInfo(userData);
        setIsFetched(true);
    };

    useEffect(() => {
        if (!userState.user) {
            navigate("/login", {replace: true});
            return;
        }

        if (params.userId) {
            const ownerId = params.userId;
            fetchedUser(ownerId);
        } else {
            const ownerId = userState.user.id as string;
            fetchedUser(ownerId);
        }
    }, [params, userState, navigate]);

    if (!isFetched) {
        return "loading...";
    }
    return (
        <>
            <div className="portfolio">
                <div className="portfolio__block">
                    <div>User</div>
                </div>
                <div className="portfolio__block">
                    <div>Edu</div>
                </div>
                <div className="portfolio__block">
                    <div>Awards</div>
                </div>
                <div className="portfolio__block">
                    <div>Projects</div>
                </div>
                <div className="portfolio__block">
                    <div>Certifications</div>
                </div>
            </div>
        </>
    );
}
