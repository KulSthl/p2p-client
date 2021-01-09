import React, { useEffect, useState } from "react";
import User from "./users";
import { loadStorage, saveStorage } from "./util";
const useServerState = (allow_cookie: boolean, callback?: (state: User) => void): [User, (user: User, allow_cookie: boolean) => void] => {
    const [state, setState] = useState(undefined as unknown as User);
    useEffect(() => {
        let token = loadStorage(allow_cookie, { key: "token" });
        let username = loadStorage(allow_cookie, { key: "username" });
        if (token !== null && username !== null) {
            const new_state = { token, username };
            setState(new_state);
            if (callback) callback(new_state);
        }
    }, [])
    const set = (response: User, allow_cookie: boolean) => {
        if (allow_cookie) {
            if (response.token) { saveStorage(allow_cookie, { key: "token", value: response.token }) };
            if (response.username) { saveStorage(allow_cookie, { key: "username", value: response.username }) };
        }
        setState(response);
    }
    return [
        state, set
    ]
}
export default useServerState;