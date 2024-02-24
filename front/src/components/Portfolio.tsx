import {get} from "api/index";
import {UserStateContext} from "context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import User from "./user";
import Awards from "./award/Awards";
import Educations from "./education/Educations";
import Certifications from "./certification/Certifications";
import Projects from "./project/Projects";

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
        // 이유를 찾았다. authorization에 토큰 값이 들어가지 않은 이유는
        // api 코드에서 axios create으로 인스턴스를 생성할 때 토큰 값이 null로 존재하고
        // 이 토큰이 get을 호출할 때 갱신되지 않았기 때문이다.
        // 갱신되지 않은 토큰 값 바로 null로 호출을 했으니 400에러가 뜬 것이다.
        const userData = await get("users", ownerId);
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
                    <User
                        userId={userInfo.id as string}
                        isEditable={userInfo.id === userState.user?.id}
                    />
                </div>
                <div className="portfolio__block">
                    <Educations
                        userId={userInfo.id as string}
                        isEditable={userInfo.id === userState.user?.id}
                    />
                </div>
                <div className="portfolio__block">
                    <Awards
                        userId={userInfo.id as string}
                        isEditable={userInfo.id === userState.user?.id}
                    />
                </div>
                <div className="portfolio__block">
                    <Certifications
                        userId={userInfo.id as string}
                        isEditable={userInfo.id === userState.user?.id}
                    />
                </div>
                <div className="portfolio__block">
                    <Projects
                        userId={userInfo.id as string}
                        isEditable={userInfo.id === userState.user?.id}
                    />
                </div>
            </div>
        </>
    );
}
