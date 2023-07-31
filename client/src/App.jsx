import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { BASE_URL } from './config'
import productState from './recoil/atoms/products'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'

function App() {

  const setProducts = useSetRecoilState(productState);


  //Get the initial list of Products from server and set the products to the productState in Recoil

  useEffect(()=>{

      const getProducts = async()=>{

        try{
          const res = await axios.get(`${BASE_URL}/`);
          setProducts({loading:false, products:res.data.products});
        }
        catch(e){
          console.log(e);
        }
        
      }

      getProducts();

  },[])

  


  const router = createBrowserRouter([
    {
      path : "/" , element:<Navbar /> ,children:[

        {
          index:true, element:<Home />
        },
        {
          path:"signup" , element : <Signup/>
        },
        {
          path:"login" , element: <Login />
        },
        {
          path:"cart" , element:<Cart/>
        },
        {
          path:"orders", element:<Orders />
        }

      ]
    }
  ])
  
  return(

    <RouterProvider router={router}/>

  )
}

export default App
