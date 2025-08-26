import { Helmet } from 'react-helmet';
import UploadPhoto from '../../components/Uploadphoto/UploadPhoto';

export default function Settings() {
  return (
    <div className='flex justify-center items-center p-6'>
        <Helmet>
            <title>Settings</title>
        </Helmet>
      <UploadPhoto/>
    </div>
  )
}
