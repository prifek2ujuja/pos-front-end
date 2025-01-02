import DashboardGreeting from './components/DashboardGreeting'
import RecentPurchases from './components/RecentPurchases'
import SalesGraph from './components/SalesGraph'
import Stats from './components/Stats'
import StockOutput from './components/StockOutput'
import { Button } from 'src/components/ui/button'
import { Link } from 'react-router-dom'
import DailyReports from './components/DailyReports'
import useDecodeToken from 'src/hooks/useDecodeToken'
import SalesLeaderboard from './components/SalesLeaderboard'
import ProductsOrdersStats from './components/ProductsOrdersStats'

const Dashboard = () => {
  const tokenData = useDecodeToken()
  const role = tokenData?.role // Add type assertion to ensure tokenData is not null before accessing role property
  return (
    <section className="w-full p-3">
      <DashboardGreeting />
      {role === 'admin' ? (
        <>
          <Stats />
          <div className="grid grid-cols-2 gap-4 mb-16 min-h-[150px]">
            {/* <DailyReports /> */}
            <SalesLeaderboard />
            <RecentPurchases />
          </div>
          <SalesGraph />
          <StockOutput />
        </>
      ) : role === 'manager' ? (
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

      {/* <ProductsOrdersStats /> */}

      {/* <section className="flex flex-col lg:flex-row gap-10"> */}

      {/* </section> */}
    </section>
  )
}

export default Dashboard
