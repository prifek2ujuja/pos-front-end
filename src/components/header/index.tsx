import { Button } from '../ui/button'
import { faker } from '@faker-js/faker'
import logo from 'src/assets/logo.jpg'
import { Link, useLocation } from 'react-router-dom'
import Auth from 'src/state/Auth'
import { MdLogout, MdLogin } from 'react-icons/md'
import useLogout from 'src/hooks/mutations/useLogout'
import { ClipLoader } from 'react-spinners'

export function Header() {
  const { avatar, authenticated } = Auth
  const { pathname } = useLocation()

  const { mutate: logout, isLoading } = useLogout()

  return (
    <div className="left-0 top-0 flex w-full items-center justify-between py-4 md:mb-5">
      <Link to="/" className="text-xs md:text-base flex flex-col items-center">
        <div className="flex items-center md:flex-row md:items-center gap-2 sm:gap-5">
          <img src={logo} alt="logo" className="h-10 md:h-16  w-10 md:w-16 rounded-full" />
          <h1 className="text-sky font-medium text-base md:text-xl underline underline-offset-4 dancing-bold">
            Juja wellness gallery
          </h1>
        </div>
      </Link>
      {authenticated.value ? (
        <div className="flex items-center gap-2  md:gap-4">
          {/* <LanguageSelector /> */}

          <img
            src={avatar.value || faker.image.avatar()}
            alt="avatar"
            className="h-8 md:h-12  w-8 md:w-12 rounded-full hidden md:block"
          />
          <Button
            onClick={() => logout()}
            className="font-medium flex items-center bg-light-gray gap-1 border-none shadow-none text-black hover:bg-light-gray hover:text-sky"
          >
            <p className="sm:text-base text-sm">Sign out</p>
            {isLoading ? <ClipLoader color="#4E97FD" size={19} /> : <MdLogout />}
          </Button>
        </div>
      ) : !pathname.includes('login') ? (
        <div className="flex items-center gap-2 md:gap-4">
          {/* <LanguageSelector /> */}
          <Link to="/login" className="flex items-center hover:text-sky">
            <Button className="font-medium bg-light-gray border-none shadow-none text-black hover:text-sky  hover:bg-light-gray ">
              Sign in
            </Button>
            <MdLogin size={19} color="#4E97FD" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
