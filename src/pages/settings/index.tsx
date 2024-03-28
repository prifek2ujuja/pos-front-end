import { Link } from 'react-router-dom'
import { ImProfile } from 'react-icons/im'
import { RxAvatar } from 'react-icons/rx'
import { MdSupport } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'

const Index = () => {
  return (
    <div className="w-full">
      <h1 className="mb-10 font-medium text-xl">Settings</h1>
      <div className="flex flex-col gap-10">
        <Link to="/account" className="flex gap-4 items-center bg-white rounded-2xl shadow-xl p-4">
          <RxAvatar />
          <div className="flex justify-between items-center gap-10 w-full">
            <div>
              <h1>Account settings</h1>
              <p className="text-sm text-gray mt-2">Manage your account</p>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Link to="" className="flex gap-4 items-center bg-white rounded-2xl shadow-xl p-4">
          <MdSupport />
          <div className="flex justify-between items-center gap-10 w-full">
            <div>
              <h1>Help and support</h1>
              <p className="text-sm text-gray mt-2">Get support</p>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Index
