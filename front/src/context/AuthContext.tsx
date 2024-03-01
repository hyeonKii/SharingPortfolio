import {get} from "api/index";
import {
    Dispatch,
    ReactNode,
    Suspense,
    createContext,
    useEffect,
    useReducer,
    // useState,
} from "react";
import {loginReducer} from "./reducer";
import {AxiosError} from "axios";
import {Loader} from "components/utils/Loader";

interface AuthProps {
    children: ReactNode;
}

export const UserStateContext = createContext({} as IUserState);
export const DispatchContext = createContext({} as Dispatch<IAction>);

export const AuthContextProvider = ({children}: AuthProps) => {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const fetchCurrentUser = async () => {
        //유저가 존재하지 않을 경우
        if (!sessionStorage.getItem("userToken")) {
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
        } catch (e) {
            if (e instanceof AxiosError) {
                alert(e.message);
            }
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            <Suspense fallback={<Loader />}>
                <DispatchContext.Provider value={dispatch}>
                    <UserStateContext.Provider value={userState}>
                        {children}
                    </UserStateContext.Provider>
                </DispatchContext.Provider>
            </Suspense>
        </>
    );
};
