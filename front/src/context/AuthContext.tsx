import {get} from "api/index";
import {Dispatch, ReactNode, createContext, useEffect, useReducer} from "react";
import {loginReducer} from "./reducer";
import {AxiosError} from "axios";

interface AuthProps {
    children: ReactNode;
}

export const UserStateContext = createContext<IUserState>({user: null});
export const DispatchContext = createContext<Dispatch<IAction>>(() => {});

export const AuthContextProvider = ({children}: AuthProps) => {
    const [userState, dispatch] = useReducer(loginReducer, {user: null});

    const fetchCurrentUser = async () => {
        //유저가 존재하지 않을 경우
        if (!sessionStorage.getItem("userToken")) {
            return dispatch({
                type: "default",
                payload: null
            });
        }

        try {
            const currentUser = await get("user/current");

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
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
            <DispatchContext.Provider value={dispatch}>
                <UserStateContext.Provider value={userState}>
                    {children}
                </UserStateContext.Provider>
            </DispatchContext.Provider>
        </>
    );
};
