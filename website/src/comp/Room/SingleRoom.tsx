// import Grow from "@material-ui/core/Grow";
import Grow from "@material-ui/core/Grow";
import React, { useMemo } from "react";
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
    const createRUsers = () => {

        let roomUsers = [] as JSX.Element[];
        rUsers.forEach((_user, idx) => {
            if (_user.username === user.username) {
                roomUsers.unshift(<div className={`room-user card ${(_user.active) ? "active" : ""}`}>
                    {(idx < 3) ? <label>{"You"}</label> : <label>{"You"}</label>}
                </div>)
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
        }}><div>
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