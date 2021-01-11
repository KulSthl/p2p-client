import { Modal } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'
import React from 'react'
import { useState } from 'react'
export interface SettingsProps {
    onClose?: (bool: boolean) => void
    button: JSX.Element
}
export const Settings: React.FC<SettingsProps> = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            {React.cloneElement(props.button, { onClick: (e: React.MouseEvent) => { e.preventDefault(); setOpen(true) } })}
            <Dialog open={open}>
                <div className="modal settings">
                    <div className="content settings">
                        {props.children}
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