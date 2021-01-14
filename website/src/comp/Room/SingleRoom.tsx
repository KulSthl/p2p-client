// import Grow from "@material-ui/core/Grow";
import Grow from "@material-ui/core/Grow";
import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import User from "../../users";
import { getRoomUsers, instanceOfError } from "../../util";
import { IRoom } from "./Room";

export interface SingleRoomProps {
    room: IRoom;
    nmbr: number;
    disableGrow?: boolean
}
export const SingleRoom: React.FC<SingleRoomProps> = ({ room, nmbr }) => {
    const { user, setRoom, url, setStep } = useContext(AppContext)
    const [rUsers, setRUsers] = useState([] as User[])
    const [finishedLoading, setFinishedLoading] = useState(false)
    useEffect(() => {
        getRoomUsers(user.token, room.id, url, (res) => {
            if (!instanceOfError(res)) {
                setRUsers(res);
            }
            setFinishedLoading(true);
        })
    }, [room])
    return (<Grow in={finishedLoading} timeout={nmbr * 50}><div className="card room btn"
        onClick={() => {
            console.log(room);
            setRoom(room)
            setStep(1)
        }}><label>
            {room.name}
        </label>
        {
            rUsers.map((_user, idx) => <div className={`room-user card ${(_user.active) ? "active" : ""}`}>
                {(idx < 3) ? <label>{_user.username}</label> : <label>{rUsers.length - 3 + "more"}</label>}
            </div>)
        }
    </div>
    </Grow>)
}