import { skeleton } from '@heroui/react'
import { Card, Dropdown, DropdownItem } from 'flowbite-react'
import moment from 'moment/moment'
import Skeleton from 'react-loading-skeleton'


export default function ProfileCard({userData,isLoading,setopenUserPhoto}) {
 
  return (
    
        <div>
  <Card >
      <div className="flex justify-end">
       
      </div>
      <div className="flex flex-col items-center px-10git ">
        <div>
             {isLoading ? <Skeleton width={80} height={80} borderRadius={50} baseColor='#dddd'/>: <img onClick={()=>setopenUserPhoto(true)} className='w-20 h-20 rounded-full'  src={userData?.data.user.photo} alt="profile user photo" />}
              </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.data.user.name}</h5>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.data.user.email}</h5>
        <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">Front End</h5>
        <h5 className='text-gray-500 dark:text-gray-400'>{isLoading?'':moment(userData?.data.user.dateOfBirth).format('l')}</h5>

      </div>
    </Card>
    </div>
  
    
  )
}
