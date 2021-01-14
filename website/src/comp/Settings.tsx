import { Modal } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/context'
import useCacheState from '../costumHooks/useCacheState'
export interface SettingsProps {
    onClose?: (bool: boolean) => void
    button: JSX.Element
}
export const Settings: React.FC<SettingsProps> = (props) => {
    const { settings, setSettings } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [showMeInRooms, setShowMeInRooms] = useCacheState("showMeInRooms", false)
    useEffect(() => {
        setSettings({ ...settings, showMeInRooms })
    }, [showMeInRooms])
    return (
        <div>
            {React.cloneElement(props.button, { onClick: (e: React.MouseEvent) => { e.preventDefault(); setOpen(true) } })}
            <Dialog open={open}>
                <div className="modal settings">
                    <div className="content settings">
                        {props.children}
                        <div className="card">
                            <label>Show me in rooms:
                             <input
                                    checked={showMeInRooms}
                                    type="checkbox"
                                    onChange={e => { setShowMeInRooms(!showMeInRooms) }}
                                />
                            </label>

                        </div>
                    </div>
                    <div className="footer settings">
                        <button
                            onClick={e => {
                                e.preventDefault();
                                setOpen(false)
                                if (props.onClose) props.onClose(false);
                            }}>
                            Close
            </button>
                    </div>
                </div>
                </Dialog>
        </div>
    )
}