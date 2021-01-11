import { url } from "inspector";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/context";
import { register, instanceOfError, login } from "../util";
import '../css/login.scss'

export interface LoginProps { }
export const Login: React.FC<LoginProps> = (props) => {
    const [name, setName] = useState("")
    const { user, setUser, url } = useContext(AppContext)
    return (<div className="card login">
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
                if (!instanceOfError(response)) {
                    setUser(response);
                }
            }).catch(_ => { })
        }}>
            Register
        </button>
        <button onClick={() => {
            login(name, url, (response) => {
                if (!instanceOfError(response)) {
                    setUser(response)
                }
            }).catch(_ => { })
        }}>
            Login
            </button>
    </div>)
}