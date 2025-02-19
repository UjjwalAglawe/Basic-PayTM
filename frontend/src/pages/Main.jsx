import { useNavigate } from "react-router-dom";

export function Main() {
    const navigate=useNavigate();
    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full  bg-white p-4 text-slate-600 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Paytm Clone</h1>
                <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={()=>{
                    navigate('/signin');
                }}>Login</button>
            </nav>

            {/* Hero Section */}
            <div className="mt-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800">Fast & Secure Payments</h2>
                <p className="mt-4 text-gray-600">Create an account and transfer money instantly</p>
                
                <div className="mt-6 flex space-x-4 justify-center">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer" onClick={()=>{
                        navigate('/signup')
                    }}>Create Account</button>
                   
                </div>
            </div>
        </div>
    );
}