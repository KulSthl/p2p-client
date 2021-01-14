export interface IconButtonProps { }
export const IconButton: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = (props) => {

    return (<a href="#" className="icon-button" {...props}>
        {props.children}
    </a>)
}