
export function loginReducer(userState: IUserState, action: IAction) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("로그인 했습니다.");
            return {
                ...userState,
                user: action.payload,
            };
        case "LOGOUT":
            
            console.log("로그아웃 했습니다.");
            return {
                ...userState,
                user: null,
            };
        default:
            return userState;
    }
}
