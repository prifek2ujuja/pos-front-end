import { Button } from 'src/components/ui/button'
import DataTable from '../dashboard/components/DataTable'
import { Link } from 'react-router-dom'
import useListOrders from 'src/hooks/queries/useListOrders'
import useOrdersTable from 'src/hooks/tableColumns/useOrdersTable'
import { LoadingCard } from 'src/components/loading'
import FilterOrders from './components/FilterOrders'
import useFilterOrders from 'src/hooks/queries/useFilterOrders'

const Index = () => {
  const { data: orders, isLoading: ordersIsLoading, isError, isFetched } = useListOrders()
  const tableColumns = useOrdersTable()
  const {
    handleApplyFilter,
    handleClearFilter,
    orders: filteredOrders,
    ordersIsLoading: isLoadingFilteredOrders,
    enabled,
  } = useFilterOrders()

  return (
    <div className="p-2 bg-white rounded-2xl w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="my-5 font-medium">Sales</h1>
          <Link to="/sell">
            <Button className="bg-sky text-sm">New sale</Button>
          </Link>
        </div>
        <FilterOrders
          handleApplyFilter={handleApplyFilter}
          handleClearFilter={handleClearFilter}
          isLoading={isLoadingFilteredOrders}
          enabled={enabled}
        />
      </div>

      {ordersIsLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <DataTable
          columns={tableColumns}
          data={filteredOrders || orders}
          isSearchable={false}
          searchField="_id"
          searchFieldPlaceholder="Filter order"
        />
      ) : null}
    </div>
  )
}

export default Index
