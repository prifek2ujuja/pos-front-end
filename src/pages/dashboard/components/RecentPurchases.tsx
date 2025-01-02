import useListRecentOrders from 'src/hooks/queries/useListRecentOrders'
import useOrdersTable from 'src/hooks/tableColumns/useOrdersTable'
import { LoadingCard } from 'src/components/loading'
import DataTable from './DataTable'

const RecentPurchases = () => {
  const { data: orders, isLoading: ordersIsLoading, isError, isFetched } = useListRecentOrders()
  const tableColumns = useOrdersTable()

  return (
    <div className="rounded-2xl p-2 lg:p-4 bg-white shadow-xl w-full col-span-2">
      <h1 className="font-medium text-sm md:text-base mb-3">Recent purchases</h1>
      {ordersIsLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <DataTable
          columns={tableColumns}
          data={orders}
          isSearchable={false}
          searchField="_id"
          searchFieldPlaceholder="Filter order"
        />
      ) : null}
    </div>
  )
}

export default RecentPurchases
