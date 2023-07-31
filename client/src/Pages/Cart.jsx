import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import cartSelector from "../recoil/selectors/cartSelector";
import cartState from '../recoil/atoms/cart';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import userSelector from '../recoil/selectors/userSelector';

function Cart() {

    const cart= useRecoilValue(cartSelector);
    const setCartState = useSetRecoilState(cartState);
    const usrState = useRecoilValue(userSelector);

    const navigate = useNavigate();

    useEffect(()=>{
      if(!usrState.user)
        navigate("/");
    },[])

    //Once the Cart Page Loads, Fetch the cart from backend

    useEffect(()=>{

        const getCart = async()=>{

          try{
            const res = await axios.get(`${BASE_URL}/cart`, {
              headers:{
                authorization : localStorage.getItem("token"),
              }
            });
            setCartState({loading:false, cart:res.data.cart, price:res.data.netPrice});
          }
          catch(e){
            console.log(e);
          }
          
        }

        getCart();

    },[])
    

    //addItems

    const addItems = async(product) => {

      try{
          const res = await axios.post(`${BASE_URL}/cart/addItems`, {
            productId : product.productId,
          },{
            headers:{
              authorization: localStorage.getItem("token"),
            }
          });

          console.log(res.data);
          setCartState({loading:false, cart:res.data.cart, price:res.data.netPrice});
      }
      catch(e){
        console.log(e);
      }

    }

    //Decrease the items

    const decItems = async(product)=>{

      try{
          const res = await axios.post(`${BASE_URL}/cart/decItems`, {
            productId : product.productId,
          },{
            headers:{
              authorization: localStorage.getItem("token"),
            }
          });

          console.log(res.data);
          setCartState({loading:false, cart:res.data.cart, price:res.data.netPrice});
      }
      catch(e){
        console.log(e);
      }

      
    }

    //removing the item

    const removeItems = async(product) => {
      
      try{
        const res = await axios.post(`${BASE_URL}/cart/removeItems`, {
          productId : product.productId,
        },{
          headers:{
            authorization: localStorage.getItem("token"),
          }
        });

        console.log(res.data);
        setCartState({loading:false, cart:res.data.cart, price:res.data.netPrice});
    }
    catch(e){
      console.log(e);
    }

    }


    //checkout

    const checkout = async()=>{

      try{
        const res = await axios.post(`${BASE_URL}/orders/add`,{},{
          headers:{
            authorization : localStorage.getItem("token"),
          }
        });

        console.log(res.data);
        setCartState({loading:false, cart:[], price:0});
        navigate("/orders");

      }
      catch(e){
        console.log(e);
      }

    }

  return (
    <div className='bg-gray-100 h-screen'>
        {cart.loading && <div>Loading ....</div>}

        {
          cart.cart.length == 0 && <div className='text-2xl font-bold flex justify-center relative top-10'> Nothing in Cart... </div>
        }

        {
          !cart.loading 

          &&

          cart.cart.length > 0 

          &&

          <div className='grid'>

              <div className='mx-auto my-6 flex flex-col items-center justify-center font-bold text-lg' >
                  TotalPrice ~ {'$'+cart.price}
                  <div className='my-3 text-md font-normal'>
                      <button onClick={checkout}
                         className='w-auto px-2 py-1 bg-green-500 rounded-full'> Checkout </button>
                  </div>

              </div>
              
              <div className='grid md:grid-cols-3 space-x-3 p-3'>

                    {
                      cart.cart.map((product,ind)=>(

                        <div  className='bg-white flex flex-col items-center space-y-3 mb-10 border border-black rounded-xl py-3 px-1'
                              key = {product.productId}>  

                            <h1>{product.title.substring(0,100)+'...'}</h1>

                            <h1 className='font-bold text-lg'>{'$'+product.price}</h1>

                            <div className='flex justify-around w-28'>

                                <div onClick={()=>decItems(product)}
                                  className='flex justify-center w-6 bg-black text-white rounded-full cursor-pointer'> - </div>
                                <div className= 'text-gray-700 font-bold font-mono text-md'>{product.quantity}</div>
                                <div onClick={()=>addItems(product)}
                                    className='flex justify-center w-6 bg-black text-white rounded-full cursor-pointer'> + </div>

                            </div>

                            <div>
                                <button onClick={()=>removeItems(product)}
                                 className='w-20 bg-red-500 rounded-full px-2 py-1'>Remove</button>
                            </div>
                        </div>
                      ))
                    }
              
              </div>

          </div>
        }
    </div>
  )
}

export default Cart