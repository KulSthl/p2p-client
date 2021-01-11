import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { loadStorage, saveStorage } from "../util";
/**
 * 
 * @param key 
 * @param init_val 
 * @param cookie if context is not available
 * @returns
 * returns value
 * function to update state
 * function to update cache
 */
function useCacheState<T>(key: string, init_val: T, cookie?: boolean): [T, (obj: T) => void, (obj: T) => void] {
    const [state, setState] = useState(init_val);
    const { allow_cookie: cookieCon } = useContext(AppContext)
    let allow_cookie = cookieCon
    if (cookie !== undefined) {
        allow_cookie = cookie
    }
    useEffect(() => {
        let lstate = loadStorage(true, { key });
        if (lstate !== null) {
            setState(lstate as T)
        }
        else {
            setState(init_val)
        }

    }, [])
    useEffect(() => {
        if (allow_cookie === true) {
            saveStateToCache(state)
        }
        else {
            // localStorage.removeItem(key);
        }
    }, [allow_cookie])
    const set = (obj: T) => {
        saveStateToCache(obj);
        setState(obj);
    }
    const saveStateToCache = (state: T) => {
        if (allow_cookie) {
            {
                saveStorage(allow_cookie, { key, value: state });
            }
        }
    }
    return [
        state, set, saveStateToCache
    ]
}
export default useCacheState;