import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import productSelector from '../recoil/selectors/productSelector';
import cartState from '../recoil/atoms/cart';
import axios from 'axios';
import { BASE_URL } from '../config';
import userSelector from '../recoil/selectors/userSelector';
import { Link } from 'react-router-dom';

function Home() {

  const setCart = useSetRecoilState(cartState);
  const productState = useRecoilValue(productSelector);
  const pr = productState.products;
  const usrState = useRecoilValue(userSelector);

  const handleAddToCart = async(product)=>{

    const message = {
      title : product.title,
      description: product.description,
      price: product.price,
      productId: product._id,
    }

    try{
      
      const res = await axios.post(`${BASE_URL}/cart/addItems`,message,{
        headers:{
          authorization:localStorage.getItem("token"),
        }
      })

      setCart({cart:res.data.cart, price : res.data.netPrice});
      console.log(res.data);

    }
    catch(e){
      console.log(e);
    }

  }

  return (

    <div>

        {/* If there is no products show the loading state */}

        {
          productState.loading && <div>Loading ....</div>
        }

        {
          !productState.loading &&

          <div className='grid md:grid-cols-3 m-2 space-y-7'>

            {
                pr.map((product)=>(

                  //INDIVIDUAL Product container
                  <div key = {product._id} className='flex flex-col items-center w-80 h-auto p-10 relative'>
                    <img className='my-2'
                      src = {product.image} />

                    <h2 className='my-2'>{product.title.substring(0,100)+"..."}</h2>

                    <h1 className='font-bold text-xl my-3'>{`$${product.price}`}</h1>

                    {
                      usrState.user 
                      ?
                      <button onClick = {()=>handleAddToCart(product)}
                          className='w-32 bg-black text-white rounded-full px-2 py-1' type="button">
                              Add to Cart
                      </button>
                      :
                      <button className='w-32 bg-black text-white rounded-full px-2 py-1' type="button">
                        <Link to = "/login">
                            Add to Cart
                        </Link>
                      </button>
                    }

                    

                  </div>
                ))
            }

          </div>

          
          
        }


    </div>
  )
}

export default Home