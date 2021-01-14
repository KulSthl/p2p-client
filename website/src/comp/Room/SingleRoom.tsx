// import Grow from "@material-ui/core/Grow";

import Grow from "@material-ui/core/Grow";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import User from "../../interfaces/users";
import { getRoomUsers, instanceOfError, leaveRoom } from "../../util";
import { IconButton } from "../IconButton";
import { IRoom } from "./Room";
import { ReactComponent as CloseIcon } from "../../img/close.svg"
export interface SingleRoomProps {
    room: IRoom;
    nmbr: number;
    disableGrow?: boolean
}
export const SingleRoom: React.FC<SingleRoomProps> = ({ room, nmbr }) => {
    const { user, setRoom, url, setStep, settings } = useContext(AppContext)
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
    const createRUsers = () => {

        let roomUsers = [] as JSX.Element[];
        rUsers.forEach((_user, idx) => {
            if (_user.username === user.username) {
                if (settings?.showMeInRooms) {
                    roomUsers.unshift(<div className={`room-user card ${(_user.active) ? "active" : ""}`}>
                        {(idx < 3) ? <label>{"You"}</label> : <label>{"You"}</label>}
                    </div>)
                }
                else {

                }
            }
            else {
                roomUsers.push(<div className={`room-user card ${(_user.active) ? "active" : ""}`}>
                    <label>{_user.username}</label>
                </div>)
            }
        })
        return roomUsers;
    }

    return (<Grow in={finishedLoading} timeout={nmbr * 50}><div className="card room btn"
        onClick={() => {
            console.log(room);
            setRoom(room)
            setStep(1)
        }}><div className="single-room-header">
            <label>
                {room.name}
            </label>
        </div>
        <span className="room wrap">
        {
                createRUsers()
        }
        </span>
    </div>
    </Grow>)
}