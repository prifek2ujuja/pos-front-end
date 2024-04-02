import React from 'react'
import { CiSettings, CiWallet } from 'react-icons/ci'
import { MdOutlineDashboard } from 'react-icons/md'
import { TbUsersGroup } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const { pathname } = useLocation()
  return (
    <section className="flex items-center py-4 right-0 justify-evenly lg:hidden fixed bottom-0 w-full bg-light-gray">
      <Link
        to="/dashboard"
        className={`flex flex-col rounded-2xl items-center gap-6 p-4 ${
          pathname === '/dashboard' ? 'text-sky bg-primary' : ''
        }`}
      >
        <MdOutlineDashboard className="text-2xl" />
        <p className="hidden md:text-xs">Overview</p>
      </Link>
      <Link
        to="/products"
        className={`flex flex-col rounded-2xl items-center gap-6 p-4 ${
          pathname === '/products' ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiWallet className="text-2xl" />
        <p className="hidden md:text-xs">Products</p>
      </Link>
      <Link
        to="/orders"
        className={`flex flex-col rounded-2xl items-center gap-6 p-4 ${
          pathname === '/orders' ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiWallet className="text-2xl" />
        <p className="hidden md:text-xs">Orders</p>
      </Link>

      <Link
        to="/users"
        className={`flex flex-col rounded-2xl items-center gap-6 p-4 ${
          pathname === '/users' ? 'text-sky bg-primary' : ''
        }`}
      >
        <TbUsersGroup className="text-2xl" />
        <p className="hidden md:text-xs">Users</p>
      </Link>
      <Link
        to="/settings"
        className={`flex flex-col rounded-2xl items-center gap-6 p-4 ${
          pathname === '/settings' ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiSettings className="text-2xl" />
        <p className="hidden md:text-xs">Settings</p>
      </Link>
    </section>
  )
}

export default BottomNav
