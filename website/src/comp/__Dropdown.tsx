import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as BoltIcon } from "../img/bolt.svg"
import { ReactComponent as CogIcon } from "../img/cog.svg"
import { ReactComponent as ChevronIcon } from "../img/chevron.svg"
import { ReactComponent as ArrowIcon } from "../img/arrow_right.svg"
import CSSTransition from "react-transition-group/CSSTransition";
import "../css/dropdown.css"
interface DropdownProps { leftIcon?: any, rightIcon?: any, goToMenu?: any }
export const DropdownMenu: React.FC<DropdownProps> = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null as unknown as number);
    const dropdownRef = useRef(undefined as unknown as HTMLDivElement);

    useEffect(() => {
        if (dropdownRef.current?.firstChild !== null) {
            let childNode = dropdownRef.current?.firstChild as HTMLDivElement;
            setMenuHeight(childNode.offsetHeight)
        }
    }, [])

    const calcHeight = (el: HTMLElement, _: boolean) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    const DropdownItem: React.FC<DropdownProps> = (props) => {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown" style={{ height: ((menuHeight !== null && menuHeight !== undefined) ? menuHeight : 0) }} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<CogIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="settings">
                        Settings
          </DropdownItem>
                    <DropdownItem
                        leftIcon="🦧"
                        rightIcon={<ChevronIcon />}
                        goToMenu="animals">
                        Animals
          </DropdownItem>

                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'animals'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Animals</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
                    <DropdownItem leftIcon="🐸">Frog</DropdownItem>
                    <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
                    <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}