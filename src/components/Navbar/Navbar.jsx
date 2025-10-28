import logo from '../../assets/images.jpg'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button ,  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,} from "@heroui/react";
import { CircleX, LogOut, Menu } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { useNavbar } from '../../hooks/useNavbar';
import { useContext, useRef, useState } from 'react';
import { TokenContext } from '../../Context/token.context';
import { NavLink } from 'react-router-dom';
import { Online } from 'react-detect-offline';

export default function Navbara() {

  const {token,logingOut} = useContext(TokenContext)
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [MenuOpen, setMenuOpen] = useState(true);
  const{data,isLoading} = useNavbar()
    const [iconOk,setIconok] = useState(true)
     const mobMenuBar = useRef('');

  function menuToggle(){
    setIconok(false)
    console.log('wow');
    mobMenuBar.current.style.transform ='translateY(32rem)'
    
}
function notMenuToggle(){
    setIconok(true)
     mobMenuBar.current.style.transform ='translateY(-32rem)'
}


  return (
  <>
 <Navbar shouldHideOnScroll maxWidth='xl' onMenuOpenChange={setIsMenuOpen}>
       <NavbarContent>
  
        <NavbarBrand>
          <img className='w-12' src={logo} alt="" />
          <p className="font-bold  p-2 text-inherit">LokApp</p>
        </NavbarBrand>
      
         {token &&   <NavLink  className={'relative  sm:hidden '}   to={'/profile'}>
            {isLoading ? <div className='h-10 w-10'><Skeleton circle={true} className='h-10'  baseColor='#ddd'/></div>:<div><img className='w-11 h-11 rounded-full' src={data?.data.user.photo} alt="user image" />
         <Online>  <div className='w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-[5px] right-[-3px]'>
            </div> </Online></div>}
          </NavLink>}
         
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
       {token ? <><NavbarItem isActive>
          <NavLink color="foreground" to={'/home'}>
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink aria-current="page" to={'/settings'}>
            Settings
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink className={'relative'}  color="foreground" to={'/profile'}>
            {isLoading ? <div className='h-10 w-10'><Skeleton circle={true} className='h-10'  baseColor='#ddd'/></div>:<div><img className='w-11 h-11 rounded-full' src={data?.data.user.photo} alt="user image" />
         <Online>  <div className='w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-[5px] right-[-3px]'>
            </div> </Online></div>}
          </NavLink>
        </NavbarItem>
         <li onClick={logingOut} className="liclass cursor-pointer">
            <LogOut />
        </li></>:<> <li>
          <NavLink to={'/login'} className="liclass">Login</NavLink>
        </li>
        <li>
          <NavLink to={'/register'} className="liclass">Register</NavLink>
        </li></>}
      </NavbarContent>
       <ul>
       {iconOk ? <div onClick={menuToggle}  className=' outline-2 hover:bg-slate-400 hover:transition-all outline-black rounded-lg p-1 md:hidden cursor-pointer'> <Menu /></div>: <div onClick={notMenuToggle}  className='hover:text-slate-400 hover:transition-all cursor-pointer md:hidden'> <CircleX size={30} /></div>}
       </ul>


      <div ref={mobMenuBar} className='flex bg-slate-300 justify-center z-50 -mt-2  text-white absolute -top-110 transition-all end-0 start-0 duration-500   items-center '> <ul className='space-y-4  w-1/2 text-center p-4  md:hidden rounded-b-2xl'>   
                {token?<>
                  <li onClick={notMenuToggle} className='border-b-2 pb-2 border-slate-300 cursor-pointer  hover:bg-slate-400 hover:rounded-md hover:p-1 hover:font-semibold hover:transition-all'><Link className='text-white ' href="/">Home</Link></li>
                  <li onClick={notMenuToggle} className='border-b-2 pb-2 border-slate-300 cursor-pointer  hover:bg-slate-400 hover:rounded-md hover:p-1 hover:font-semibold hover:transition-all'><Link className='text-white ' href="/settings">Setting</Link></li>
                  <li  onClick={notMenuToggle} className='border-b-2 pb-2 border-slate-300 cursor-pointer hover:bg-slate-400 hover:rounded-md hover:p-1 hover:font-semibold hover:transition-all'><Link className='text-white ' href="profile">Profile</Link></li>
                  <li onClick={logingOut} className=' border-b-2 pb-2 border-slate-300  hover:bg-slate-400 hover:rounded-md hover:p-1 cursor-pointer hover:font-semibold hover:transition-all'>LogOut</li>
              </>:<><li onClick={notMenuToggle} className='border-b-2 pb-2 border-slate-300 cursor-pointer  hover:bg-slate-400 hover:rounded-md hover:p-1 hover:font-semibold hover:transition-all'><Link  className='text-white' href="/login">Login</Link></li>
              <li onClick={notMenuToggle} className='border-b-2 pb-2 border-slate-300 cursor-pointer  hover:bg-slate-400 hover:rounded-md hover:p-1 hover:font-semibold hover:transition-all'><Link  className='text-white' href="/register">Register</Link></li></>}
                
            </ul></div>
    </Navbar>




</>
  )
}
