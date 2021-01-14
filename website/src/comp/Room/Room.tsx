import React, { useContext, useEffect, useMemo, useReducer, useState } from "react"
import { AppContext } from "../../context/context"
import useCacheState from "../../costumHooks/useCacheState";
import { createRoom, getRoom, instanceOfError, joinRoom, leaveRoom } from "../../util";
import '../../css/room.scss'
import { SingleRoom } from "./SingleRoom";
import Collapse from "@material-ui/core/Collapse";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { useRef } from "react";
export interface RoomProps {

}
export interface IRoom {
    name: string;
    id: string;
}
export const Room: React.FC<RoomProps> = (props) => {
    const { room, setRoom, user, url, step, setStep } = useContext(AppContext);
    const [rooms, setRooms] = useState([] as IRoom[]);
    const [newRoom, setNewRoom] = useState("")
    const [loginId, setLoginId] = useState("")
    const copyInput = useRef(undefined as unknown as HTMLInputElement)
    useEffect(() => {
        if (user) {
            getRoom(user.token, url, (res) => {
                if (!instanceOfError(res)) {
                    setRooms(res)
                };
            })
        }
    }, [user])
    useEffect(() => {
        return () => {
            if (user === undefined) {
                setRooms([])
            }
        }
    }, [])
    const rooms_jsx = useMemo(() => rooms.map((room, idx) => <SingleRoom room={room} key={idx} nmbr={idx} />), [rooms]);
    return (
        <>
            <div className="room-content">
                <Collapse in={step === 0 ? true : false}>

                    <>
                        <h2>Create or join a room:</h2>
                        <div className="room-create">
                            <div>
                                <input className="room input" value={newRoom} onChange={e => {
                                    e.preventDefault();
                                    if (e.target.value.length < 10) setNewRoom(_ => {
                                        return e.target.value.trim()
                                    })
                                }} placeholder={"Name"} />
                                <button className="btn room create" onClick={
                                    e => {
                                        e.preventDefault();
                                        createRoom(user.token, newRoom, url, () => {
                                            getRoom(user.token, url, (res) => {
                                                if (!instanceOfError(res)) {
                                                    setRooms(res)
                                                };
                                            })
                                        })
                                    }
                                }>Create</button>
                            </div>
                            <div>
                                <input className="room input" value={loginId} onChange={e => {
                                    e.preventDefault();
                                    setLoginId(_ => {
                                        return e.target.value.trim()
                                    })
                                }} placeholder="Id" />
                                <button className="btn room join" onClick={
                                    e => {
                                        e.preventDefault();
                                        joinRoom(user.token, loginId, url, () => {
                                            getRoom(user.token, url, (res) => {
                                                if (!instanceOfError(res)) {
                                                    setRooms(res)
                                                };
                                            })
                                        })
                                    }
                                }>Join</button></div>
                        </div>
                        {rooms !== [] && <h2 className="room-headline">Available Rooms</h2>}
                        <div className="room-container">
                            {rooms_jsx}
                        </div>
                    </>
                </Collapse>
                <Collapse in={step === 1 ? true : false}>
                    {room && <div className="room-active">
                        <button onClick={e => {
                            e.preventDefault();
                            setStep(0)
                        }}>
                            Back
                        </button>
                        <button className="btn copy-link" onClick={e => {
                            e.preventDefault();
                            copyInput.current.select();
                            copyInput.current.setSelectionRange(0, 99999); /* For mobile devices */
                            document.execCommand("copy");

                        }}>
                            {" Copy Id "}
                        </button>
                        <button className="btn" onClick={e => {
                            e.preventDefault();
                            leaveRoom(user.token, room.id, url, () => { setStep(0) })

                        }}>
                            Leave
                        </button>
                        <input ref={copyInput} className="copy-link" value={room.id} readOnly style={{
                            position: "fixed", opacity: 0, pointerEvents: "none"
                        }} />
                        <div className="single-room-content">
                            <SingleRoom room={room} key={"ActiveRoom" + Math.random()} nmbr={10} disableGrow />
                        </div>
                    </div>}
                </Collapse>

            </div >
        </>
    )
}