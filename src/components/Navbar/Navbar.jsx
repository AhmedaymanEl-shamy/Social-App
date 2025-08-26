import logo from '../../assets/images.jpg'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button ,  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,} from "@heroui/react";
import { LogOut } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { useNavbar } from '../../hooks/useNavbar';
import { useContext, useState } from 'react';
import { TokenContext } from '../../Context/token.context';
import { NavLink } from 'react-router-dom';

export default function Navbara() {

  const {token,logingOut} = useContext(TokenContext)
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const{data,isLoading} = useNavbar()


  return (
 <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
       <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden absolute end-0 me-10 p-4" 
        />
        <NavbarBrand>
          <img className='w-12' src={logo} alt="" />
          <p className="font-bold p-2 text-inherit">LokApp</p>
        </NavbarBrand>
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
           <div className='w-4 h-4 rounded-full bg-white absolute bottom-[5px] right-[-3px]'>
            <span className='w-3.5 h-3.5 rounded-full bg-green-500 absolute bottom-0 right-0'></span>
            </div> </div>}
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
      <NavbarMenu>
     
          <NavbarMenuItem >
             {token ? <><NavbarItem isActive>
          <NavLink  color="foreground" to={'/home'}>
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink aria-current="page" to={'/settings'}>
            Settings
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink color="foreground" to={'/profile'}>
           Profile
          </NavLink>
        </NavbarItem>
         <li onClick={logingOut} className="liclass cursor-pointer">
            <LogOut />
        </li></>:<>
        <NavbarItem isActive>
          <NavLink color="foreground" to={'/login'}>Login</NavLink>
          </NavbarItem> 
        <NavbarItem isActive>
          <NavLink color="foreground" to={'/register'}>Register</NavLink>
          </NavbarItem> 
          
         
        </>}
          </NavbarMenuItem>
     
      </NavbarMenu>
    </Navbar>





  )
}
