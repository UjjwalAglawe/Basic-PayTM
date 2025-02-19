import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Users } from "../components/User";
import { Yourbalance } from "../components/Yourbalance";
import axios from "axios";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [balance, setBalance] = useState();
    const navigate=useNavigate();
    useEffect(() => {
        async function getBalance() {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
                headers: {
                    authorization: localStorage.getItem("authorization")
                }
            })
            console.log("Balance = ", response.data);
            console.log(typeof (response.data.balance))
            setBalance(response.data.balance);
        }
        getBalance();
    }, [])

    console.log("outside", balance);

    function logoutHandler()
    {
        localStorage.removeItem("authorization");
        navigate("/signin");
        
    }
    return (
        <div className=" px-10 py-10">
            <div className="flex justify-end">
                <div className="flex justify-center w-25 left-44">
                    <Button label={"Logout"} onClick={logoutHandler}/>
                </div>
            </div>
            <Appbar />
            <Yourbalance value={balance} />
            <Users />
        </div>
    )
}

export default Dashboard;