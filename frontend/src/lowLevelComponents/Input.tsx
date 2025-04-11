
interface Props
{
    legend: string,
    value: string,
    placeholder: string,
    onchange: ( e: React.ChangeEvent<HTMLInputElement> ) => void
}

const Input = ( props: Props ) =>
{
    return (
        <div>
            <legend className="fieldset-legend">{ props.legend }</legend>
            <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                <input type="text" value={ props.value } onChange={ props.onchange } required placeholder={ props.placeholder } />
            </label>
        </div>
    )
}

export default Input