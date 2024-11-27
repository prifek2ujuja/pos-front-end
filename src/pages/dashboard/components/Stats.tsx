import { Skeleton } from 'src/components/ui/skeleton'
import useOrderStats from 'src/hooks/queries/useOrderStats'
import { BsCashStack } from 'react-icons/bs'
import { FaCashRegister } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'
import useInventoryStats from 'src/hooks/queries/useInventoryStats'

const Stats = () => {
  const { data: stats, isLoading: statsIsLoading, isSuccess } = useOrderStats()
  const {
    data: inventoryStats,
    isLoading: inventoryStatsIsLoading,
    isSuccess: inventoryStatsIsSuccess,
  } = useInventoryStats()

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value)
  }

  return (
    <section className="w-full flex flex-col gap-10 md:gap-5  mb-16">
      <div className="space-y-3">
        <h1 className="font-medium text-lg">Sales</h1>
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
                <h1 className="text-2xl font-medium">{formatNumber(stats?.ordersInLastTwentyFourHours.totalOrders)}</h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(stats?.ordersInLastTwentyFourHours.totalValue)}</p>
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
                <h1 className="text-2xl font-medium">{formatNumber(stats?.ordersInLastOneWeek.totalOrders)}</h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(stats?.ordersInLastOneWeek.totalValue)}</p>
                  <BsCashStack className="text-sky" size={21} />
                </div>
              </div>
            ) : (
              <div>
                <p>Something went wrong</p>
              </div>
            )}
          </div>
          <div className="rounded-xl col-span-2 md:col-span-1 p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
            <p className="font-medium text-sm md:text-base">All time sales</p>
            {statsIsLoading ? (
              <>
                <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
                <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
              </>
            ) : isSuccess ? (
              <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
                <h1 className="text-2xl font-medium">{formatNumber(stats?.allTimeOrders.totalOrders)}</h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(stats?.allTimeOrders.totalValue)}</p>
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
      </div>
      <div className="space-y-3">
        <h1 className="font-medium text-lg">Inventory</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2 lg:gap-7 w-full">
          <div className="rounded-xl p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
            <p className="font-medium text-sm md:text-base">In store</p>
            {inventoryStatsIsLoading ? (
              <>
                <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
                <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
              </>
            ) : inventoryStatsIsSuccess ? (
              <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
                <h1 className="text-2xl font-medium">{formatNumber(inventoryStats?.numberOfProductsInStore)}</h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(inventoryStats?.totalStoreValue)}</p>
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
            <p className="font-medium text-sm md:text-base">Back office</p>
            {inventoryStatsIsLoading ? (
              <>
                <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
                <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
              </>
            ) : inventoryStatsIsSuccess ? (
              <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
                <h1 className="text-2xl font-medium">{formatNumber(inventoryStats?.numberOfProductsInBackOffice)}</h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(inventoryStats?.totalBackOfficeValue)}</p>
                  <BsCashStack className="text-sky" size={21} />
                </div>
              </div>
            ) : (
              <div>
                <p>Something went wrong</p>
              </div>
            )}
          </div>
          <div className="rounded-xl col-span-2 md:col-span-1 p-2 shadow-xl flex flex-col gap-2 bg-white justify-between md:p-4">
            <p className="font-medium text-sm md:text-base">All products</p>
            {inventoryStatsIsLoading ? (
              <>
                <Skeleton className="w-[100px] md:w-[200px] h-4 bg-sky " />
                <Skeleton className="w-[80px] md:w-[150px] h-4 bg-sky" />
              </>
            ) : inventoryStatsIsSuccess ? (
              <div className="flex flex-col lg:flex-row md:gap-4 lg:items-center w-full">
                <h1 className="text-2xl font-medium">
                  {formatNumber(inventoryStats?.numberOfProductsInBackOffice + inventoryStats?.numberOfProductsInStore)}
                </h1>
                <div className="flex justify-between items-center w-full">
                  <p className="font-medium">ksh {formatNumber(inventoryStats?.totalValue)}</p>
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
      </div>
    </section>
  )
}

export default Stats
