import useListRecentOrders from 'src/hooks/queries/useListRecentOrders'
import { PacmanLoader } from 'react-spinners'
import { GiCash } from 'react-icons/gi'

const RecentPurchases = () => {
  const { data: orders, isLoading: ordersIsLoading, isSuccess } = useListRecentOrders()
  return (
    <div className="rounded-2xl p-2 bg-white shadow-xl w-full">
      <h1 className="my-5 font-medium">Recent purchases</h1>
      {ordersIsLoading ? (
        <div className="flex items-center justify-center">
          <PacmanLoader color="#4E97FD" />
        </div>
      ) : isSuccess ? (
        <div className="">
          {orders.map((order) => (
            <div key={crypto.randomUUID()} className="flex justify-between items-center">
              <p className="flex flex-wrap gap-3 items-center">
                {order.orderItems.map((item) => (
                  <span key={crypto.randomUUID()}>
                    {item.product.name} x {item.quantity}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-3">
                {' '}
                <span className="">
                  <GiCash className="text-green-500" size={21} />
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
