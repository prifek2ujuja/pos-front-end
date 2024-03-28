import Auth from 'src/state/Auth'
import DashboardGreeting from './components/DashboardGreeting'
import RecentPurchases from './components/RecentPurchases'
import SalesGraph from './components/SalesGraph'
import Stats from './components/Stats'
import StockOutput from './components/StockOutput'
import { Button } from 'src/components/ui/button'
import { Link } from 'react-router-dom'
import DailyReports from './components/DailyReports'

const Dashboard = () => {
  return (
    <section className="w-full p-3">
      <DashboardGreeting />
      {Auth.role.value === 'admin' ? (
        <>
          <Stats />
          <div className="flex flex-col md:flex-row gap-4 mb-16 min-h-[150px]">
            <DailyReports />
            <RecentPurchases />
          </div>
          <SalesGraph />
          <StockOutput />
        </>
      ) : Auth.role.value === 'manager' ? (
        <>
          <RecentPurchases />
          <StockOutput />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Link to="/sell">
            <Button className="bg-sky w-40">New sale</Button>
          </Link>
        </div>
      )}

      {/* <section className="flex flex-col lg:flex-row gap-10"> */}

      {/* </section> */}
    </section>
  )
}

export default Dashboard
