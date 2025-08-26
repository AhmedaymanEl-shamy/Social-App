import { Helmet } from 'react-helmet';
import UploadPhoto from '../../components/Uploadphoto/UploadPhoto';

export default function Settings() {
  return (
    <>
        <Helmet>
            <title>Settings</title>
        </Helmet>
    <div className='flex justify-center items-center p-6'>
      <UploadPhoto/>
    </div>
    </>
  )
}
