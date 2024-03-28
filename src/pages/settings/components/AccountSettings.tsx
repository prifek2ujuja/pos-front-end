import { FaArrowLeft } from 'react-icons/fa6'
import ProfileSettings from './ProfileSettings'
import PasswordChange from './PasswordChange'
import { Button } from 'src/components/ui/button'
import { useNavigate } from 'react-router-dom'

const AccountSettings = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full ">
      <Button onClick={() => navigate(-1)} className="bg-light-gray shadow-none text-black">
        <FaArrowLeft />
      </Button>
      <div className="w-full md:flex md:justify-between">
        <ProfileSettings />
        <PasswordChange />
      </div>
    </div>
  )
}

export default AccountSettings
