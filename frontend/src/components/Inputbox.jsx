export function Inputbox({label,placeholder,onChange})
{
    return (
        <div>
            <div className=" text-lg font-semibold py-1">
                {label}
            </div>
            <input onChange={onChange} type="text" placeholder={placeholder} className=" border-2 border-slate-300 w-full rounded-lg px- py-2 "/>
        </div>
    )
}