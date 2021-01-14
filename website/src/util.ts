import { IRoom } from "./comp/Room/Room";
import User from "./users";
interface IError {
    id: number;
    message: string;
}
export const instanceOfError = (object: any): object is IError => {
    return typeof object.message === 'string';
}
export const register = async (name: string, url: string, callback: (response: User | IError) => void) => {
    const response = await fetch(`${url}/api/users/register`, {
        method: 'PUT',
        body: JSON.stringify({
            username: name
        } as User), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
    ).catch(err => { console.error(err) });
}
export const login = async (name: string, url: string, callback: (response: User | IError) => void) => {
    const response = await fetch(`${url}/api/users/login`, {
        method: 'PUT',
        body: JSON.stringify({
            username: name
        } as User), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const getFriends = async (token: string, url: string, callback: (response: Array<User> | IError) => void) => {
    const response = await fetch(`${url}/api/users/get`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const createRoom = async (token: string, room_name: string, url: string, callback: (response: IRoom | IError) => void) => {
    const response = await fetch(`${url}/api/room/create`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token,
            name: room_name
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const joinRoom = async (token: string, room_id: string, url: string, callback: (response: IRoom | IError) => void) => {
    await fetch(`${url}/api/room/join`, {
        method: 'PUT',
        body: JSON.stringify({
            token,
            room_id
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const getRoom = async (token: string, url: string, callback: (response: Array<IRoom> | IError) => void) => {
    const response = await fetch(`${url}/api/room/get`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const getRoomUsers = async (token: string, room_id: string, url: string, callback: (response: Array<User> | IError) => void) => {
    const response = await fetch(`${url}/api/room/get/users`, {
        method: 'PUT',
        body: JSON.stringify({
            token,
            room_id
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const leaveRoom = async (token: string, room_id: string, url: string, callback: (response: IRoom | IError) => void) => {
    fetch(`${url}/api/room/leave`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token,

        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(json => {
            callback(json)
        }
        ).catch(err => { console.error(err) });
    // do something with myJson
}
export const logout = async (token: string, url: string, callback: (response: {} | IError) => void) => {
    fetch(`${url}/api/users/logout`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token,
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .catch(err => { console.error(err) });
    // do something with myJson
}
export const saveStorage = (bool: boolean, obj: { key: string, value: any }) => {
    if (bool) {
        if (obj.value !== undefined && obj.value !== null) {
            if (typeof obj.value === 'string') {
                localStorage.setItem(obj.key, obj.value);
            }
            else {
                localStorage.setItem(obj.key, JSON.stringify(obj.value));
            }
        }
        else {
            localStorage.removeItem(obj.key)
        }
    }
}
export const loadStorage = (bool: boolean, obj: { key: string }): null | string | {} | [] | boolean => {
    if (bool) {
        const item = localStorage.getItem(obj.key);
        if (item === null) return null
        try {
            return JSON.parse(item)
        } catch (error) {
            return item
        }

    }
    return null;
}
export const getServerUrl = (): string => {
    let url = new URL(window.location.href);
    if (url.origin === "http://localhost:3000" || url.origin === "http://localhost:3001") {
        return "http://localhost:5002"
    }
    return url.origin
}