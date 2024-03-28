import { Outlet } from 'react-router-dom'
import Aside from './Aside'

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      <Aside />
      <Outlet />
    </div>
  )
}

export default Layout
