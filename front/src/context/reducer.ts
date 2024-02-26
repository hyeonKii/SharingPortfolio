

export function loginReducer(userState: IUserState, action: IAction) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...userState,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...userState,
                user: null,
            };
        default:
            return userState;
    }
}
