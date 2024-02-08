import {Dispatch, createContext, useEffect, useReducer, useState} from "react";
import {loginReducer} from "context/reducer";
import {get} from "api";
import {BrowserRouter as Router} from "react-router-dom";
import Routers from "components/Router";

export const UserStateContext = createContext({} as IUserState);
export const DispatchContext = createContext({} as Dispatch<IAction>);

function App() {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await get("user/current");

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser as UserProps | null,
            });

            console.log("세션 스토리지에 토큰이 존재합니다");
            console.log(userState);
        } catch {
            console.log("세션 스토리지에 토큰이 존재하지 않습니다.");
        }
        setIsFetched(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isFetched) {
        return "loading...";
    }

    const isAuth = !!userState.user;

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                <Router>
                    <Routers isAuth={isAuth}/>
                </Router>
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
