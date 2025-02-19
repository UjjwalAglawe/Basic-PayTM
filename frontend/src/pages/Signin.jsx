import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    async function submitHandler()
    {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,{
            username,
            password
        });

        console.log(response.data.token);
        localStorage.setItem("authorization",response.data.token);
        navigate("/dashboard");

    }
    return (
        <div className="flex justify-center py-10 bg-slate-300 h-screen">
            <div className="flex flex-col justify-center bg-white px-8 py-8 rounded-3xl">
                <div className="flex justify-center">
                    <Heading label={"Sign in"} />
                </div>
                <Subheading label={"Enter your infromation to Sign in an account"} />
                <Inputbox label={"Username"} placeholder={"Username"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <Inputbox label={"Password"} placeholder={"Password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">

                    <Button label={"Signin"} onClick={submitHandler}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>

        </div>
    )
}

export default Signin;