import { MdOutlineDashboard } from 'react-icons/md'
import { CiWallet, CiPillsBottle1, CiSettings } from 'react-icons/ci'
import { Link, useLocation } from 'react-router-dom'

const Aside = () => {
  const { pathname } = useLocation()
  return (
    <section className="hidden md:flex  flex-col gap-7 bg-white">
      <h1 className="mb-10">LOGO</h1>
      <Link
        to="/dashboard"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('dashboard') ? 'text-sky bg-light-gray' : ''
        }`}
      >
        <MdOutlineDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        to="/orders"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('orders') ? 'text-sky bg-light-gray' : ''
        }`}
      >
        <CiWallet />
        <p>Orders</p>
      </Link>
      <Link
        to="/products"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('products') ? 'text-sky bg-light-gray' : ''
        }`}
      >
        <CiPillsBottle1 />
        <p>Products</p>
      </Link>
      <Link
        to="/products"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('products') ? 'text-sky bg-light-gray' : ''
        }`}
      >
        <CiPillsBottle1 />
        <p>Users</p>
      </Link>
      <Link
        to="/settings"
        className={`flex items-center font-medium rounded-2xl gap-2 p-2 ${
          pathname.includes('settings') ? 'text-sky bg-light-gray' : ''
        }`}
      >
        <CiSettings />
        <p>Settings</p>
      </Link>
    </section>
  )
}

export default Aside
