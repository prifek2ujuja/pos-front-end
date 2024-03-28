import React, { ReactNode } from 'react'
import { LanguageSelector } from '../language-selector'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { IoMdNotificationsOutline, IoIosArrowDown } from 'react-icons/io'
import { faker } from '@faker-js/faker'
import logo from 'src/assets/logo.jpg'
import { Link, Navigate } from 'react-router-dom'
import { useHookstate } from '@hookstate/core'
import Auth from 'src/state/Auth'
import { MdLogout } from 'react-icons/md'
import useLogout from 'src/hooks/mutations/useLogout'
import { PropagateLoader } from 'react-spinners'

interface IProps {
  leftNode?: ReactNode
}

export function Header(props: IProps) {
  const { t } = useTranslation()
  const { authenticated, avatar } = Auth

  const { mutate: logout, isLoading } = useLogout()

  if (!authenticated.value) {
    return <Navigate to="/login" />
  }

  return (
    <div className="left-0 top-0 flex w-full items-start justify-between px-4 py-4 md:px-12 mb-10 lg:mb-16">
      <Link to="/" className="text-xs md:text-base flex flex-col items-center">
        <div className="flex flex-col items-start md:flex-row md:items-center gap-5">
          <img src={logo} alt="logo" className="h-10 md:h-16  w-10 md:w-16 rounded-full" />
          <h1 className="text-sky font-medium">Juja wellness gallery</h1>
        </div>

        {/* <p className="text-sky font-medium">Juja branch</p> */}
      </Link>
      <div className="flex items-center md:gap-4">
        <LanguageSelector />
        <div className="flex items-center gap-1 md:gap-3">
          {Auth.role.value === 'admin' && <Link to="/dashboard">Admin</Link>}
          <Button className="text-xl relative bg-light-gray border-none shadow-none text-black hover:bg-light-gray hover:text-sky">
            <IoMdNotificationsOutline />
            <span className="bg-red-500 w-1 h-1 rounded-full top-1 left-2" />
          </Button>
          <img
            src={avatar.value || faker.image.avatar()}
            alt="avatar"
            className="h-10 md:h-12  w-10 md:w-12 rounded-full"
          />
          <Button
            onClick={() => logout()}
            className="text-xl bg-light-gray border-none shadow-none text-black hover:bg-light-gray hover:text-sky"
          >
            {isLoading ? <PropagateLoader /> : <MdLogout />}
          </Button>
        </div>
      </div>
    </div>
  )
}
