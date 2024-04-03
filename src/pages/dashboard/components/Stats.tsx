import { Skeleton } from 'src/components/ui/skeleton'
import useOrderStats from 'src/hooks/queries/useOrderStats'
import { BsCashStack } from 'react-icons/bs'
import { FaCashRegister } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'

const Stats = () => {
  const { data: stats, isLoading: statsIsLoading, isSuccess } = useOrderStats()
  return (
    <section className="w-full flex flex-col gap-10 md:gap-5 md:flex-row  mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2 lg:gap-7 w-full">
        <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">Sales today</p>
          {statsIsLoading ? (
            <>
              <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
              <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
            </>
          ) : isSuccess ? (
            <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
              <h1 className="text-2xl font-medium">{stats?.ordersInLastTwentyFourHours.totalOrders}</h1>
              <div className="flex justify-between items-center w-full">
                <p className="font-medium">ksh {stats?.ordersInLastTwentyFourHours.totalValue}</p>
                <FaCashRegister className="text-sky" size={19} />
              </div>
            </div>
          ) : (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </div>
        <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">Sales this week</p>
          {statsIsLoading ? (
            <>
              <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
              <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
            </>
          ) : isSuccess ? (
            <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
              <h1 className="text-2xl font-medium">{stats?.ordersInLastOneWeek.totalOrders}</h1>
              <div className="flex justify-between items-center w-full">
                <p className="font-medium">ksh {stats?.ordersInLastOneWeek.totalValue}</p>
                <BsCashStack className="text-sky" size={21} />
              </div>
            </div>
          ) : (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </div>
        <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">All time sales</p>
          {statsIsLoading ? (
            <>
              <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
              <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
            </>
          ) : isSuccess ? (
            <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
              <h1 className="text-2xl font-medium">{stats?.allTimeOrders.totalOrders}</h1>
              <div className="flex justify-between items-center w-full">
                <p className="font-medium">ksh {stats?.allTimeOrders.totalValue}</p>
                <GiCash className="text-sky" size={21} />
              </div>
            </div>
          ) : (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Stats
