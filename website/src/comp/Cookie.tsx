import { useContext } from "react";
import { AppContext } from "../context/context";
import { saveStorage } from "../util";

export interface CookieProps { onChange?: (bool: boolean) => void }
export const Cookie: React.FC<CookieProps> = (props) => {
    const { allow_cookie, set_allow_cookie } = useContext(AppContext)
    return (
        <span>{"Cookies "}
            <button key={0} className={allow_cookie === true ? "active" : undefined} onClick={
                e => {
                    e.preventDefault();
                    saveStorage(true, { key: "allow_cookie", value: true })
                    if (props.onChange) props.onChange(true)
                    set_allow_cookie(true);
                }
            }>Allow</button><button key={1} className={allow_cookie === false ? "active" : undefined} onClick={e => {
                e.preventDefault();
                localStorage.clear();
                if (props.onChange) props.onChange(false);
                set_allow_cookie(false);
            }}>Deny</button>
        </span>
    )
}