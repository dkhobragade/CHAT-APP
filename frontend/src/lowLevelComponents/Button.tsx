
interface Props
{
    onChange: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
    text: String
    isDisable: boolean
    type?: 'success' | 'error'
}


const Button = ( props: Props ) =>
{
    return (
        <div className="justify-self-end">
            <button disabled={ props.isDisable } className={ `btn btn-soft btn-${ props.type || 'success' }` } onClick={ props.onChange }>{ props.text }</button>
        </div>
    )
}

export default Button