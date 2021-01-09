import React, { useEffect, useState } from "react";
import User from "./users";
import { loadStorage, saveStorage } from "./util";
const useCacheState = (allow_cookie: boolean, callback?: (state: User) => void): [User, (user: User, allow_cookie: boolean) => void, (user: User, allow_cookie: boolean) => void] => {
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
        saveStateToCache(response, allow_cookie);
        setState(response);
    }
    const saveStateToCache = (lstate?: User, allow_cookie?: boolean) => {
        let istate = lstate ? lstate : state;
        if (allow_cookie) {
            if (istate?.token) { saveStorage(allow_cookie, { key: "token", value: istate.token }) };
            if (istate?.username) { saveStorage(allow_cookie, { key: "username", value: istate.username }) };
        }
    }
    return [
        state, set, saveStateToCache
    ]
}
export default useCacheState;