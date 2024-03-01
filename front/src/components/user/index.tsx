import {get} from "api/index";
import {Suspense, useEffect, useState} from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import { Loader } from "components/utils/Loader";

export default function User({userId, isEditable}: OwnerProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [user, setUser] = useState<UserProps>({});

    useEffect(() => {
        get("users", userId).then((user) => setUser(user));
    }, [userId]);

    return (
        <>
            <Suspense fallback={<Loader />}>
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
            </Suspense>
        </>
    );
}
