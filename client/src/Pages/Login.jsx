import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { useState } from "react"
import { useSetRecoilState } from "recoil";
import userState from "../recoil/atoms/user";
import cartState from "../recoil/atoms/cart";
import orderState from "../recoil/atoms/orders";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const setUser = useSetRecoilState(userState);
    const setCart = useSetRecoilState(cartState);
    const setOrders = useSetRecoilState(orderState);

    const handleLogin = async ()=>{

        try{
            const res = await axios.post(`${BASE_URL}/login`,{
                email,
                password,
            })
    
            localStorage.setItem("token", res.data.token);
            setUser({loading:false, user:res.data.userId});
            setCart({loading:false, cart:res.data.cart, price:res.data.netPrice});
            setOrders({loading:false, orders:res.data.orders});
            navigate("/");

        }
        catch(e){
            console.log(e);
        }
    }

  return (
    <div className="flex h-screen w-screen justify-center items-center">

            <div 
                className="flex flex-col bg-gray-200 rounded-xl items-center h-80 w-80 px-2 py-2 ">

                <h1 className="text-3xl my-3">LogIn</h1>

                <input className = "my-2 border border-gray-500 px-2 py-2 rounded-xl"
                    onChange={(e) => setEmail(e.target.value)} type = "email" placeholder='Enter Email' 
                    value={email} />

                <input className = "my-2 border border-gray-500 px-2 py-2 rounded-xl"  
                    onChange = {(e)=> setPassword(e.target.value)} type = "password" 
                    placeholder='Enter Password' value ={password} />

                <button className = "my-2 rounded-full w-20 cursor-pointer bg-black text-white px-2 py-2" 
                    type="button" onClick = {handleLogin}>Login</button>

                <div className="text-xs text-gray-500"> 
                    Do not have an Account ? Instead <Link className="text-blue-400" to ="/signup">SignUp</Link> here
                </div>

            </div>
        </div>
  )
}

export default Login