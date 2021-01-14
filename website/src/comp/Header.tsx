import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/context";
import "../css/header.scss"
import logo from '../img/logo.svg';
import User from "../users";
import { register, login, instanceOfError, getServerUrl } from "../util";
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
        setUrl(getServerUrl())
    }, [])
    useEffect(() => {
        setName(user?.username ? user.username : "")
    }, [allow_cookie])
    return (
        <>
            <div className={`header ${mobile ? "mobile" : "desktop"}`}>
                <div className="left">
                </div>
                <div className='middle'>

                    <label>MyApp</label>
                    <img src={logo} />

                </div>

                <div className="right">
                    <Settings button={<button>
                        Settings
                    </button>
                    }>
                        <>
                            <div className="card">
                                <label> Server: <input value={url} onChange={e => {
                                    e.preventDefault();
                                    setUrl(e.target.value.trim())
                                }} />
                                </label>
                            </div >
                        </>
                    </Settings>


                    {
                        user !== undefined &&
                        <button className={'btn logout'} onClick={e => {
                            e.preventDefault();
                            setUser(undefined as unknown as User)
                        }}>
                            Logout
                    </button>
                    }
                </div>
            </div>



        </>
    )
}