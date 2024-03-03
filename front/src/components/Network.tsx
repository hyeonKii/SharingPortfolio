import {get} from "api/index";
import {UserStateContext} from "context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserCard from "./user/UserCard";

export function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    const [users, setUsers] = useState<UserProps[]>([]);
    const [search, setSearch] = useState<string>("");

    // const sortByNameASC = () => {
    //     const sortedUser = [...users].sort(
    //         (a, b) => -a.name.localeCompare(b.name)
    //     );
    //     setUsers(sortedUser);
    // };

    // const sortByNameDESC = () => {
    //     const sortedUser = [...users].sort((a, b) =>
    //         a.name.localeCompare(b.name)
    //     );
    //     setUsers(sortedUser);
    // };

    useEffect(() => {
        get("userlist").then((users) => setUsers(users));
    }, [userState, navigate]);

    return (
        <>
            <div className="main__frame">
                <div className="search__block">
                    <form className="search__form">
                        <input
                            type="text"
                            className="search"
                            value={search}
                            placeholder="검색"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>
                <div className="userCard__block">
                    {users
                        .filter((data) =>
                            search === "" ? data : data.name?.includes(search)
                        )
                        .map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                </div>
            </div>
        </>
    );
}
