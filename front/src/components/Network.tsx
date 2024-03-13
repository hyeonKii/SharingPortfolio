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
            <div className="networking__frame">
                <div className="networking__container">
                    <div className="flex flex-col my-5 justify-center items-center">
                        <div className="text-2xl text-indigo-600 font-medium mb-5">Networking</div>
                        <div className="mb-2 rounded-lg bg-white">
                            <input
                                type="text"
                                className="bg-transparent h-7 w-full rounded-lg text-black-500 ring-2 px-2 ring-indigo-400 focus:ring-sky-600 focus:outline-none"
                                value={search}
                                placeholder="검색"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="searchResult__block">
                        {users
                            .filter((data) =>
                                search === ""
                                    ? data
                                    : data.name?.includes(search)
                            )
                            .map((user) => (
                                <div key={user.id} className="searchResult__card">
                                    <UserCard user={user} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
