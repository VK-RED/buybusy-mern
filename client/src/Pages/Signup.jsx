import { useState } from "react"
import axios from "axios";
import { BASE_URL } from "../config";
import userState from "../recoil/atoms/user";
import cartState from "../recoil/atoms/cart";
import orderState from "../recoil/atoms/orders";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const setUser = useSetRecoilState(userState);
    const setCart = useSetRecoilState(cartState);
    const setOrders = useSetRecoilState(orderState);


    const handleSignup = async ()=>{

        try{

            const res = await axios.post(BASE_URL+"/signup" , {
                email,
                password
            });

            setUser({loading:false, user:res.data.userId});
            setCart({loading:false, cart:res.data.cart, price:res.data.netPrice});
            setOrders({loading:false, orders:res.data.orders});
            localStorage.setItem("token", res.data.token);

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

                <h1 className="text-3xl my-3">SignUp</h1>

                <input className = "my-2 border border-gray-500 px-2 py-2 rounded-xl" 
                    placeholder='Enter name' />

                <input className = "my-2 border border-gray-500 px-2 py-2 rounded-xl"
                    onChange={(e) => setEmail(e.target.value)} type = "email" placeholder='Enter Email' 
                    value={email} />

                <input className = "my-2 border border-gray-500 px-2 py-2 rounded-xl"  
                    onChange = {(e)=> setPassword(e.target.value)} type = "password" 
                    placeholder='Enter Password' value ={password} />

                <button className = "my-2 rounded-full w-20 cursor-pointer bg-black text-white px-2 py-2" 
                    type="button" onClick = {handleSignup}>Sign Up</button>

            </div>
        </div>
    )
    }

export default Signup