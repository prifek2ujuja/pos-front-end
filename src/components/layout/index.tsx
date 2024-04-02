import { Header } from '../header'
import Aside from './components/Aside'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import BottomNav from 'src/pages/dashboard/components/BottomNav'
import Auth from 'src/state/Auth'

export const getNoneLayout = (page: React.ReactElement) => page

export const getHeaderLayout = (page: React.ReactElement) => {
  return (
    <Suspense fallback={<PropagateLoader color="blue" />}>
      <div className="min-h-screen relative border poppins-regular  bg-light-gray p-4 md:p-0">
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="flex mx-auto">{page}</div>
        </div>
      </div>
    </Suspense>
  )
}

export const getDefaultLayout = (page: React.ReactElement) => {
  const { authenticated } = Auth

  if (!authenticated.value) {
    return <Navigate to="/login" />
  }

  return (
    <Suspense fallback={<PropagateLoader color="blue" />}>
      <div className="min-h-screen relative border poppins-regular bg-light-gray p-4 md:p-0">
        <div className="max-w-7xl mx-auto sm:px-4">
          <Header />
          <div className="flex mx-auto mb-28 lg:mb-0">
            <Aside />
            {page}
          </div>
          <BottomNav />
        </div>
      </div>
    </Suspense>
  )
}
