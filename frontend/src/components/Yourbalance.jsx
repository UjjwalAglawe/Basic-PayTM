export function Yourbalance({ value }) {
    return (
        <div className=" py-5">
            <div className="flex border-2 border-slate-400 rounded-2xl shadow-2xl h-14">
                <div className="flex flex-col justify-center h-full ml-4 font-bold text-lg">
                    Your Balance
                </div>
                <div className="flex flex-col justify-center h-full ml-4 font-semibold text-lg">
                    Rs {value}
                </div>
            </div>
        </div>

    )
}