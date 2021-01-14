import React from "react";
import { IRoom } from "../comp/Room/Room";
import User from "../interfaces/users";
import { ISettings } from "../interfaces/settings";

export interface Context {
    user: User;
    setUser: (user: User) => void;
    url: string;
    setUrl: (url: string) => void;
    allow_cookie: boolean;
    set_allow_cookie: (bool: boolean) => void;
    mobile: boolean;
    setMobile: (bool: boolean) => void;
    room: IRoom;
    setRoom: (room: IRoom) => void;
    step: number;
    setStep: (number: number) => void;
    settings: Partial<ISettings>;
    setSettings: (obj: ISettings) => void;
}
export const AppContext = React.createContext(
    {
        allow_cookie: false,
        mobile: false,
        step: 0
    } as Context);