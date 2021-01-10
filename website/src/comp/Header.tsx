import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/context";
import "../css/header.scss"
import logo from '../img/logo.svg';
import { register, login } from "../util";
import { Settings } from "./Settings";

export interface HeaderProps {
    allow_cookie: boolean
}
export const Header: React.FC<HeaderProps> = () => {
    const { url, user, setUrl, setUser, allow_cookie, mobile, setMobile } = useContext(AppContext)
    const [name, setName] = useState("")
    const [, setDrawMenu] = useState(false)
    useEffect(() => {
        let rootEl = document.getElementById("root");
        const detecter = () => {
            if (rootEl !== null) {
                if (rootEl.clientWidth > 700) {
                    setMobile(false)
                }
                else {
                    setMobile(true)
                }
            }
        }
        detecter();
        // window.addEventListener('resize', detecter)
        // return () => {
        //     window.removeEventListener('resize', detecter)
        // }
    }, [])
    useEffect(() => {
        if (mobile === true) setDrawMenu(false)
    }, [mobile])
    useEffect(() => {
        setUrl("http://localhost:5002")
    }, [])
    useEffect(() => {
        setName(user?.username ? user.username : "")
    }, [allow_cookie])
    return (
        <>
            <div className={`header ${mobile ? "mobile" : "desktop"}`}>
                <Settings button={
                    <img src={logo} />
                }>
                    <>
                        <div className="card">
                            <label> Server: <input value={url} onChange={e => {
                                e.preventDefault();
                                setUrl(e.target.value.trim())
                            }} />
                            </label>
                        </div >

                        <div className="card">
                            <label> Name:
                                <input value={name} onChange={e => {
                                    e.preventDefault();
                                    setName(_ => {
                                        return e.target.value.trim()
                                    })
                                }} />
                            </label>
                            <button onClick={() => {
                                register(name, url, (response) => {
                                    setUser(response, allow_cookie);
                                }).catch(_ => { })
                            }}>
                                Register
                        </button>
                            <button onClick={() => {
                                login(name, url, (response) => {
                                    setUser(response, allow_cookie);
                                }).catch(_ => { })
                            }}>
                                Login
                        </button>
                        </div>
                    </>
                </Settings>
                <label>MyApp</label>
            </div>



        </>
    )
}