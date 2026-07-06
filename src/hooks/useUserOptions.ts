import { useEffect, useState } from "react";
import { clearUser, getUser, setUser } from "./userStorage";

export function useUserOptions() {

    const [userData, setUserData] = useState<User | null>();

    const refresh = async () => {
        const data = await getUser();
        setUserData(data);
    };

    const setDataUser = async (user: User) => {
        await setUser(user);
        await refresh();
    };

    const deleteDataUser = async () => {
        await clearUser();
        await refresh();
    }
    useEffect(() => {
        refresh();
    }, []);

    return {
        userData,
        deleteDataUser,
        setDataUser,
        refresh,
    };
}