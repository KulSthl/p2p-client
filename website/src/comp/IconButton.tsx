export interface IconButtonProps { }
export const IconButton: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {

    return (<button {...props} className={`${props.className ? props.className : ""} icon-button`}>
        {props.children}
    </button >)
}