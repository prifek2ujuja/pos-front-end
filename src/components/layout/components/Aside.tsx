import { MdOutlineDashboard } from 'react-icons/md'
import { CiWallet, CiPillsBottle1, CiSettings } from 'react-icons/ci'
import { TbUsersGroup } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import Auth from 'src/state/Auth'

const Aside = () => {
  const { pathname } = useLocation()
  return (
    <section className="hidden md:flex flex-col gap-7 pt-20 px-10">
      <Link
        to="/dashboard"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('dashboard') ? 'text-sky bg-white' : ''
        }`}
      >
        <MdOutlineDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        to="/orders"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('orders') ? 'text-sky bg-white' : ''
        }`}
      >
        <CiWallet />
        <p>Orders</p>
      </Link>
      <Link
        to="/products"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('products') ? 'text-sky bg-white' : ''
        }`}
      >
        <CiPillsBottle1 />
        <p>Products</p>
      </Link>
      {(Auth.role.value === 'admin' || Auth.role.value === 'manager') && (
        <Link
          to="/users"
          className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
            pathname.includes('users') ? 'text-sky bg-white' : ''
          }`}
        >
          <TbUsersGroup />
          <p>Users</p>
        </Link>
      )}

      <Link
        to="/settings"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('settings') ? 'text-sky bg-white' : ''
        }`}
      >
        <CiSettings />
        <p>Settings</p>
      </Link>
    </section>
  )
}

export default Aside
