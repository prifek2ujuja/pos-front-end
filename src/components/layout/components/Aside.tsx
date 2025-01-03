import { MdOutlineDashboard } from 'react-icons/md'
import { CiWallet, CiPillsBottle1, CiSettings } from 'react-icons/ci'
import { TbUsersGroup } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import useDecodeToken from 'src/hooks/useDecodeToken'

const Aside = () => {
  const { pathname } = useLocation()
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  return (
    <section className="hidden lg:flex flex-col gap-7  px-10">
      <Link
        to="/dashboard"
        className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
          pathname.includes('dashboard') ? 'text-sky bg-primary' : ''
        }`}
      >
        <MdOutlineDashboard />
        <p>Overview</p>
      </Link>
      <Link
        to="/sales"
        className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
          pathname.includes('sales') ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiWallet />
        <p>Sales</p>
      </Link>
      <Link
        to="/products"
        className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
          pathname.includes('products') ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiPillsBottle1 />
        <p>Products</p>
      </Link>
      {(role === 'admin' || role === 'manager') && (
        <>
          <Link
            to="/reports"
            className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
              pathname.includes('report') ? 'text-sky bg-primary' : ''
            }`}
          >
            <TbUsersGroup />
            <p>Reports</p>
          </Link>
          <Link
            to="/users"
            className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
              pathname.includes('users') ? 'text-sky bg-primary' : ''
            }`}
          >
            <TbUsersGroup />
            <p>Users</p>
          </Link>
        </>
      )}

      <Link
        to="/settings"
        className={`flex items-center font-medium rounded-xl gap-2 p-2 ${
          pathname.includes('settings') ? 'text-sky bg-primary' : ''
        }`}
      >
        <CiSettings />
        <p>Settings</p>
      </Link>
    </section>
  )
}

export default Aside
