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

interface UserEditProps {
    user: UserProps | null;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

interface UserCardProps {
    user: UserProps | null;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}