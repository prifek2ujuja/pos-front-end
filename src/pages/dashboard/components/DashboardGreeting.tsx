/* eslint-disable import/no-absolute-path */
/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs'
import useUserProfile from 'src/hooks/queries/useUserProfile'
import Auth from 'src/state/Auth'
import { Button } from 'src/components/ui/button'
import { Link } from 'react-router-dom'

const DashboardGreeting = () => {
  const { data: profile } = useUserProfile(Auth.id.value as string)

  const getTimeOfDay = () => {
    const currentTime = dayjs()
    const currentHour = currentTime.hour()

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning'
    }
    if (currentHour >= 12 && currentHour < 17) {
      return 'Good afternoon'
    }
    return 'Good evening'
  }
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-ff-poppins mb-8">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium text-neutral-dark md:text-xl 2xl:text-2xl">
          {`${getTimeOfDay()} ${profile?.userName}`}
        </h1>
        {/* <FaHandSparkles className="text-3xl text-sky" /> */}
        <p className="text-3xl">👋</p>
      </div>
      {Auth.role.value !== 'sales' && (
        <Link to="/sell">
          <Button className="bg-sky">Make a sale</Button>
        </Link>
      )}
    </div>
  )
}

export default DashboardGreeting
