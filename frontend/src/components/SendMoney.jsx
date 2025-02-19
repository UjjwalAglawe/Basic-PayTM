import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SendMoney = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    async function SendM() {
        console.log("id= " + id + " name= " + name + " amount= " + amount);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`,
                {
                    to: id,
                    amount: amount
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("authorization")
                    }
                }
            );
            alert("Transfer Successfull");
            console.log("res", response.data);

        }
        catch (e) {
            console.log("Error", e);
            alert("Transfer Failed");
        }

    }

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-2xl text-white">A</span>
                        </div>
                        <h3 className="text-2xl font-semibold">Friend's Name</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </div>
                        <button onClick={SendM} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-700 text-white cursor-pointer">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}