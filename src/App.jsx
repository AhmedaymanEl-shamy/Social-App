import { Facebook } from "iconsax-reactjs"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Layout from './components/layout/Layout';
import { Toaster } from "react-hot-toast"
import Profile from './pages/Profile/Profile';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import TokenProvider from "./Context/token.context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import PostDeatails from "./pages/PostDeatils/PostDeatails"
import Settings from "./pages/Settings/Settings"
import { Offline, Online } from "react-detect-offline"

const routers =createBrowserRouter([
  {path:'',element:<ProtectedRoute> <Layout /> </ProtectedRoute>, children:[
    {index:true,element: <Home />},
    {path:'/home',element: <Home />},
    {path:'/profile',element:<Profile />},
    {path:'/settings',element:<Settings />},
    {path:'/postdeatils/:id',element:<PostDeatails />},
    {path:'*',element:<div className="h-screen flex justify-center items-center text-4xl"><h1>Not found</h1></div>}
    
  ]},
     {path:'',element:<GuestRoute> <Layout/> </GuestRoute> ,children:[
      {path:'/login',element:<Login />},
      {path:'/register',element:<Register />}
  ]}

])

 const queryClient = new QueryClient()
function App() {


  return (
    <>
        
          <TokenProvider>
              <QueryClientProvider client={queryClient}>
               <RouterProvider router={routers}/>
                 <ReactQueryDevtools initialIsOpen={false} />
                 <Toaster />
              </QueryClientProvider>
          </TokenProvider>
    </>
  )
}

export default App
