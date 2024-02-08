interface UserProps {
    id?: string;
    email?: string;
    name?: string;
    password?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    profileImageFilename?: string;
}

interface IUserState {
    user?: UserProps | null;
}

interface IAction {
    type: string;
    payload?: UserProps | null;
}