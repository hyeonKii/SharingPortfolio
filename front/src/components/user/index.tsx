import {get} from "api/index";
import {useEffect, useState} from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";

export default function User({userId, isEditable}: OwnerProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [user, setUser] = useState<Partial<UserProps>>({});


    useEffect(() => {
        get("users", userId).then((user) => setUser(user));
    }, [userId]);

    return (
        <>
            {isEdit ? (
                <UserEditForm
                    user={user}
                    setIsEdit={setIsEdit}
                    setUser={setUser}
                />
            ) : (
                <UserCard
                    user={user}
                    setIsEdit={setIsEdit}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}
