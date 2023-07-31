import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userSelector from "../recoil/selectors/userSelector"
import userState from '../recoil/atoms/user';

function Navbar() {

    const usrState = useRecoilValue(userSelector);
    const setUserState = useSetRecoilState(userState);

    const handleLogOut = ()=>{
      setUserState({user:null, loading:false});
      localStorage.setItem("token", null);
    }

  return (
    <div>
        
        <div className='flex justify-between border py-7 px-2 text-white bg-black -mt-2 -ml-2'>

            <div className='mx-10 font-bold text-3xl'>
                <Link to = "/">BUYBUSY</Link>
            </div>

            <div className='flex '>

              <Link className='mx-5' to = "/">Home</Link>

              {
                usrState.user ?

                <div className='flex justify-between'>
                    <Link className='mx-5' to = "/cart">Cart</Link>
                    <Link className='mx-5' to ="/orders">Orders</Link>
                    <Link className='mx-5' to="/" onClick={handleLogOut}>LogOut</Link>
                </div>
                :
                <div className='mx-5'>
                  <Link to ="/login">Login</Link>
                </div>
              }

            </div>

        </div>

        <Outlet/>
    </div>
  )
}

export default Navbar