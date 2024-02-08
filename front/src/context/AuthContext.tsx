import {get} from "api/index";
import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {loginReducer} from "./reducer";

interface AuthProps {
    children: ReactNode;
}

export const UserStateContext = createContext({} as IUserState);
export const DispatchContext = createContext({} as Dispatch<IAction>);

export const AuthContextProvider = ({children}: AuthProps) => {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [isInit, setIsInit] = useState<boolean>(false);

    const fetchCurrentUser = async () => {
        //유저가 존재하지 않을 경우
        if (!sessionStorage.getItem("userToken")) {
            setIsInit(true);
            return dispatch({
                type: "default",
            });
        }

        try {
            const currentUser = await get("user/current");

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser as UserProps | null,
            });

            console.log("세션 스토리지에 토큰이 존재합니다");
        } catch {
            console.log("세션 스토리지에 토큰이 존재하지 않습니다.");
        }
        setIsInit(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    //패칭이 안된 경우
    if (!isInit) {
        return "loading";
    }

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                {children}
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
};
