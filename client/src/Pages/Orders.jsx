import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../config'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import orderState from "../recoil/atoms/orders"
import orderSelector from "../recoil/selectors/orderSelector"
import userSelector from '../recoil/selectors/userSelector'
import { useNavigate } from 'react-router-dom'


function Orders() {

    const orState = useRecoilValue(orderSelector);
    const setOrderState = useSetRecoilState(orderState);
    const usrState = useRecoilValue(userSelector);
    const navigate = useNavigate();

    useEffect(()=>{

        if(!usrState.user)
        navigate("/");

    },[])

    useEffect(()=>{
        getOrders();
    },[])


    //Get the past cart history of the users
    const getOrders = async()=>{

        try{
            const res = await axios.get(`${BASE_URL}/orders`,{
                headers:{
                    authorization : localStorage.getItem("token"),
                }
            });
            setOrderState({loading: false, orders: res.data.orders})
        }
        catch(e){
            console.log(e);
        }
            
    }

  return (
    <div className='bg-gray-100 h-screen'>

            {orState.loading && <div> Loading ... </div>}
            
            <div className='bg-white'>
                {
                    !orState.loading &&
                    <div>
                        
                        <div className='text-2xl font-bold mx-auto my-4 flex justify-center'> YOUR ORDERS </div>

                        {                

                            orState.orders.map((order,ind)=>(

                                <div key = {ind} className=' flex flex-col items-center border border-black rounded-md p-4 m-3 mx-auto'>

                                    <h3 className='text-2xl font-semibold my-2'>Order Summary</h3>

                                    <h3 className='my-3 justify-center flex text-lg font-semibold'>Purchased On : {order.purchasedOn}</h3>

                                    <table>

                                        <thead>
                                            <tr>
                                                <th className='border border-gray-300 py-1 px-2'>Title</th>
                                                <th className='border border-gray-300 py-1 px-2'>Price</th>
                                                <th className='border border-gray-300 py-1 px-2'>Quantity</th>
                                                <th className='border border-gray-300 py-1 px-2' > Net Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order.cart.map((item, ind)=>(
                                                    <tr key = {ind}>
                                                        <td className='border border-gray-300 py-1 px-2'>{item.title.substring(0,50)+"..."}</td>
                                                        <td className='border border-gray-300 py-1 px-2'>${item.price}</td>
                                                        <td className='border border-gray-300 py-1 px-10'>{item.quantity}</td>
                                                        <td className='border border-gray-300 py-1 px-2 flex justify-center'>${item.price * item.quantity}</td>
                                                    </tr>
                                                ))
                                            }

                                            <tr>
                                                <td className='border border-gray-300 py-1 px-2'>-</td>
                                                <td className='border border-gray-300 py-1 px-2'>-</td>
                                                <td className='border border-gray-300 py-1 px-2'>-</td>
                                                <td className='border border-gray-300 py-1 px-2 font-bold'>Total Price : ${order.netPrice}</td>
                                            </tr>

                                            

                                        </tbody>


                                    </table>


                                </div>
                            ))
                        }
                    
                    </div>
                }
            </div>

    </div>
  )
}

export default Orders