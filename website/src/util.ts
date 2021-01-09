import User from "./users";

export const register = async (name: string, url: string, callback: (response: User) => void) => {
    const response = await fetch(`${url}/register`, {
        method: 'PUT',
        body: JSON.stringify({
            username: name
        } as User), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json(); //extract JSON from the http response
    callback(json);
    // do something with myJson
}
export const login = async (name: string, url: string, callback: (response: User) => void) => {
    const response = await fetch(`${url}/login`, {
        method: 'PUT',
        body: JSON.stringify({
            username: name
        } as User), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json(); //extract JSON from the http response
    callback(json);
    // do something with myJson
}
export const getFriends = async (token: string, url: string, callback: (response: Array<User>) => void) => {
    const response = await fetch(`${url}/users`, {
        method: 'PUT',
        body: JSON.stringify({
            token: token
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json(); //extract JSON from the http response
    callback(json);
    // do something with myJson
}
export const saveStorage = (bool: boolean, obj: { key: string, value: string }) => {
    if (bool) {
        localStorage.setItem(obj.key, obj.value);
    }
}
export const loadStorage = (bool: boolean, obj: { key: string }) => {
    if (bool) {
        return localStorage.getItem(obj.key);
    }
    return null;
}