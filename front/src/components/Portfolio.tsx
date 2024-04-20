import {get} from "api/index";
import {UserStateContext} from "context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import User from "./user";
import Awards from "./award/Awards";
import Educations from "./education/Educations";
import Certifications from "./certification/Certifications";
import Projects from "./project/Projects";
import {Loader} from "./utils/Loader";

export function Portfolio() {
    const navigate = useNavigate();
    const params = useParams();

    const userState = useContext(UserStateContext);

    const [userInfo, setUserInfo] = useState<Partial<UserProps>>({});
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchedUser = async (ownerId: string) => {
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

    return (
        <>
            {!isFetched ? (
                <Loader />
            ) : (
                <>
                    <div className="portfolio__frame">
                        <div className="portfolio__user">
                            <User
                                userId={userInfo.id as string}
                                isEditable={userInfo.id === userState.user?.id}
                            />
                        </div>
                        <div className="portfolio__detail">
                            <Educations
                                userId={userInfo.id as string}
                                isEditable={userInfo.id === userState.user?.id}
                            />
                        </div>
                        <div className="portfolio__detail">
                            <Awards
                                userId={userInfo.id as string}
                                isEditable={userInfo.id === userState.user?.id}
                            />
                        </div>
                        <div className="portfolio__detail">
                            <Certifications
                                userId={userInfo.id as string}
                                isEditable={userInfo.id === userState.user?.id}
                            />
                        </div>
                        <div className="portfolio__detail">
                            <Projects
                                userId={userInfo.id as string}
                                isEditable={userInfo.id === userState.user?.id}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
