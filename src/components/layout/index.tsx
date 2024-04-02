import { Navigate } from 'react-router-dom'
import { Header } from '../header'
import Aside from './components/Aside'
import Auth from 'src/state/Auth'
import { hookstate } from '@hookstate/core'
import { Suspense } from 'react'
import { PropagateLoader } from 'react-spinners'
import BottomNav from 'src/pages/dashboard/components/BottomNav'

export const getNoneLayout = (page: React.ReactElement) => page

export const getHeaderLayout = (page: React.ReactElement) => {
  return (
    <Suspense fallback={<PropagateLoader color="blue" />}>
      <div className="min-h-screen relative border poppins-regular  bg-light-gray">
        <div className="max-w-7xl mx-auto">
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
      <div className="min-h-screen relative border poppins-regular  bg-light-gray">
        <div className="max-w-7xl mx-auto sm:px-4">
          <Header />
          <div className="flex mx-auto">
            <Aside />
            {page}
          </div>
          <BottomNav />
        </div>
      </div>
    </Suspense>
  )
}
