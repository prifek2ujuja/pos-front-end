import { Header } from '../header'
import Aside from './components/Aside'
import { Suspense } from 'react'
import { PropagateLoader } from 'react-spinners'
import BottomNav from 'src/pages/dashboard/components/BottomNav'
import LoginRedirect from './components/LoginRedirect'

export const getNoneLayout = (page: React.ReactElement) => page

export const getHeaderLayout = (page: React.ReactElement) => {
  return (
    <Suspense fallback={<PropagateLoader color="blue" />}>
      <div className="min-h-screen relative border poppins-regular  bg-light-gray p-2 md:p-0">
        <div className="max-w-6xl 2xl:max-w-7xl  mx-auto">
          <Header />
          <div className="flex mx-auto">{page}</div>
        </div>
      </div>
    </Suspense>
  )
}

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <Suspense fallback={<PropagateLoader color="blue" />}>
      <div className="min-h-screen relative border poppins-regular bg-light-gray p-2 md:p-0">
        <div className="w-full mx-auto md:px-4 max-w-[1800px]">
          <Header />
          <LoginRedirect />
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
