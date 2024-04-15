import useListRecentOrders from 'src/hooks/queries/useListRecentOrders'
import { PacmanLoader } from 'react-spinners'
import { GiCash } from 'react-icons/gi'

const RecentPurchases = () => {
  const { data: orders, isLoading: ordersIsLoading, isSuccess } = useListRecentOrders()
  return (
    <div className="rounded-2xl p-2 lg:p-4 bg-white shadow-xl w-full col-span-2">
      <h1 className="font-medium text-sm md:text-base mb-3">Recent purchases</h1>
      {ordersIsLoading ? (
        <div className="flex items-center justify-center">
          <PacmanLoader color="#4E97FD" />
        </div>
      ) : isSuccess ? (
        <div className="">
          {orders.map((order) => (
            <div key={crypto.randomUUID()} className="flex justify-between items-center">
              <div className="flex flex-wrap gap-3 items-center text-sm md:text-base">
                {order.orderItems.map((item) => (
                  <p key={crypto.randomUUID()}>
                    {item.product.name} <span className="text-sm">({item.quantity})</span>
                  </p>
                ))}
              </div>
              <p className="flex items-center font-medium gap-3">
                {' '}
                <span className="">
                  <GiCash className="text-sky" size={21} />
                </span>
                ksh {order.orderTotal}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p>Something went wrong. Please try again</p>
        </div>
      )}
      {isSuccess && orders.length === 0 && (
        <div>
          <p>No recent purchases</p>
        </div>
      )}
    </div>
  )
}

export default RecentPurchases
