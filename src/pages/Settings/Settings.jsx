import { Helmet } from 'react-helmet';
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";
import userUploadPhoto from '../../assets/socialapp.png'
import toast from "react-hot-toast";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import Skeleton from "react-loading-skeleton";
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function Settings() {
  
      const {image,openFrom,setopenform,handleImage,imageInput,mutate,userData,isLoading,isError,error} = useUploadPhoto()
     if(isLoading){
          return <div className='mx-auto w-3xl h-screen'>
             <Skeleton className="h-160"  borderRadius={20} baseColor='#dddd' />
          </div>
        }
  
  if(isError){
      return <div >
               <h2>{error.error.message}</h2>
              </div>
  }
  return (
    <>
        <Helmet>
            <title>Settings</title>
        </Helmet>
    <div className='flex justify-center items-center p-6'>
       <Card className="w-200 ">
      <div className="flex justify-end px-20 pt-4">
        <Dropdown className="font-semibold" inline label="Click me">
          <DropdownItem>
            <Link
              to={'/home'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to={'/profile'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </DropdownItem>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
                <label>     <input ref={imageInput} type="file"  onChange={handleImage} className="hidden" />
                {image?  <img 
          alt="user image"
         
          src={image}
    
          className="mb-3 w-50 h-50 rounded-full shadow-lg"
        />:  <img 
          alt="user image"
         
          src={userUploadPhoto}
    
          className="mb-3 w-50 h-50 rounded-full shadow-lg"
        />}
      </label>
        <h3 className="font-medium text-gray-500 dark:text-white">Change user photo</h3>
         <div onClick={image ? mutate:()=>toast.error('choose image')} className="mb-20 flex space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Change  
          </a>
       
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.data.user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Settings</span>
        <div onClick={()=>{setopenform(!openFrom)}} className="mt-4 flex space-x-3 lg:mt-6">
          <button
           
            className="inline-flex cursor-pointer items-center rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Change Password
          </button>
        </div>
             {openFrom && <div className="pt-3"><ChangePassword setopenform={setopenform}/></div>}
      </div>
      
    </Card>
    </div>
    </>
  )
}
