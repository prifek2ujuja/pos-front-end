import { IoMdArrowDropdown } from 'react-icons/io'
import { Skeleton } from 'src/components/ui/skeleton'
import useOrderStats from 'src/hooks/queries/useOrderStats'

const Stats = () => {
  const { data: stats, isLoading: statsIsLoading, isSuccess } = useOrderStats()
  console.log(stats)
  return (
    <section className="w-full flex flex-col gap-10 md:gap-5 md:flex-row  mb-16">
      <div className="w-full md:w-[400px] lg:w-1/3 flex flex-col justify-between">
        <div className="flex md:flex-col gap-11 p-3 md:p-5 bg-white rounded-2xl shadow-xl w-full">
          {/* <div>
            <h1 className="font-medium text-2xl">20</h1>
            <p className=" text-xs font-medium md:text-sm">Today&apos;s therapy sessions</p>
          </div> */}
          <div>
            <h1 className="font-medium text-2xl">{stats?.ordersInLastTwentyFourHours.totalOrders}</h1>
            <p className=" text-xs md:text-sm font-medium">Today&apos;s total sales</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 lg:gap-7 w-full">
        <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">This weeks orders</p>
          {statsIsLoading ? (
            <>
              <Skeleton className="w-[200px] bg-sky" />
              <Skeleton className="w-[150px] bg-sky" />
            </>
          ) : isSuccess ? (
            <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
              <h1 className="text-2xl font-medium">{stats?.ordersInLastOneWeek.totalOrders}</h1>
              <div className="flex justify-between w-full">
                <p className="font-medium">ksh {stats?.ordersInLastOneWeek.totalValue}</p>
                <div className="flex items-center text-xs text-sky">
                  <IoMdArrowDropdown />
                  <p>21.2%</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Something went wrong</p>
            </div>
          )}
        </div>
        <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">All orders</p>
          <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
            <h1 className="text-2xl font-medium">{stats?.allTimeOrders.totalOrders}</h1>
            <div className="flex justify-between w-full">
              <p className="font-medium ">ksh {stats?.allTimeOrders.totalValue}</p>
              <div className="flex items-center text-xs text-sky">
                <IoMdArrowDropdown />
                <p>21.2%</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">All therapy sessions</p>
          <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
            <h1 className="text-2xl font-medium">213</h1>
            <div className="flex justify-between w-full">
              <p className="font-medium">ksh 600000</p>
              <div className="flex items-center text-xs text-destructive">
                <IoMdArrowDropdown />
                <p>21.2%</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
          <p className="font-medium text-sm md:text-base">This week therapy sessions</p>
          <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
            <h1 className="text-2xl font-medium">500</h1>
            <div className="flex justify-between w-full">
              <p className="font-medium">ksh 23000</p>
              <div className="flex items-center text-xs text-sky">
                <IoMdArrowDropdown />
                <p>21.2%</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Stats
