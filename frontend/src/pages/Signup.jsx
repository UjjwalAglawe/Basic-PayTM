import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    
    async function submitHandler()
    {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,{
            username,
            firstName,
            lastName,
            password
        })

        console.log(response.data.token);
        localStorage.setItem("authorization",response.data.token);
        navigate("/dashboard");
    }

    return (
        <div className="flex justify-center py-10 bg-slate-300 h-screen">
            <div className="flex flex-col justify-center bg-white px-8 py-8 rounded-3xl">
                <div className="flex justify-center">
                    <Heading label={"Sign up"} />
                </div>
                <Subheading label={"Enter your infromation to create an account"} />

                <Inputbox label={"First Name"} placeholder={"First Name"} onChange={(e)=>{
                    setfirstName(e.target.value)
                }}/>

                <Inputbox label={"Last Name"} placeholder={"Last Name"} onChange={(e)=>{
                    setlastName(e.target.value)
                }}/>

                <Inputbox label={"Username"} placeholder={"Username"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>

                <Inputbox label={"Password"} placeholder={"Password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">

                    <Button label={"Signup"} onClick={submitHandler}/>
                </div>
                <BottomWarning label={"Alredy have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
    )
}

export default Signup;