import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage(){
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    async function handleloginSubmit(ev){
        ev.preventDefault();
    }
    return (
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-52">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleloginSubmit()}>
                    <input type="email" placeholder="your@email.com" value = {email} onChange={ev=>{setEmail(ev.target.value)}}/>
                    <input type="password" placeholder="password" value={password} onChange={ev => {setPassword(ev.target.value)}}/>
                    <button className="primary"> Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Dont have an account yet? <Link className="text-black underline" to={"/register"}> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}