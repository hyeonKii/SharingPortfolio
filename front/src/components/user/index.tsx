import {get} from "api/index";
import {useEffect, useState} from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";



export default function User({userId, isEditable}: OwnerProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<UserProps>({});

    useEffect(() => {
        get("users", userId).then((user) => setUser(user));
    }, [userId]);

    return (
        <>
            {isEditing ? (
                <UserEditForm
                    user={user}
                    setIsEditing={setIsEditing}
                    setUser={setUser}
                />
            ) : (
                <UserCard
                    user={user}
                    setIsEditing={setIsEditing}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
