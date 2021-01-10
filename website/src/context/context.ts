import React from "react";
import User from "../users";

export interface Context {
    user: User;
    setUser: (user: User, allow_cookie: boolean) => void;
    url: string;
    setUrl: (url: string) => void;
    allow_cookie: boolean;
    mobile: boolean;
    setMobile: (bool: boolean) => void;
}
export const AppContext = React.createContext(undefined as unknown as Context);