import logo from '../../assets/images.jpg'
import { Link, NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { useNavbar } from '../../hooks/useNavbar';
import { useContext } from 'react';
import { TokenContext } from '../../Context/token.context';
export default function Navbar() {

  const {token,logingOut} = useContext(TokenContext)

  const{data,isLoading} = useNavbar()

  return (
<nav className="border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={'/home'} className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl  font-semibold whitespace-nowrap dark:text-white">Lokapp</span>
    </Link>
    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="ulclass">
        {token ? <><li>
          <NavLink to={'/home'}  className="liclass" aria-current="page">Home</NavLink>
        </li>

        <li>
          <NavLink to={'/settings'}  className="liclass" aria-current="page">Settings</NavLink>
        </li>
        
        <li>
          <NavLink to={'/profile'} className="liclass relative">  {isLoading ? <div className='h-10 w-10'><Skeleton circle={true} className='h-10'  baseColor='#ddd'/></div>:<div><img className='w-11 h-11 rounded-full' src={data.data.user.photo} alt="user image" />
           <div className='w-4 h-4 rounded-full bg-white absolute bottom-[5px] right-[-3px]'>
            <span className='w-3.5 h-3.5 rounded-full bg-green-500 absolute bottom-0 right-0'></span>
            </div> </div>}</NavLink>
        </li>
        
        <li onClick={logingOut} className="liclass cursor-pointer">
            <LogOut />
        </li>
        </>:<> <li>
          <NavLink to={'/login'} className="liclass">Login</NavLink>
        </li>
        <li>
          <NavLink to={'/register'} className="liclass">Register</NavLink>
        </li></>}

      </ul>
    </div>
  </div>
</nav>


  )
}
