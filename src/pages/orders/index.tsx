import { Button } from 'src/components/ui/button'
import DataTable from '../dashboard/components/DataTable'
import { Link } from 'react-router-dom'
import useListOrders from 'src/hooks/queries/useListOrders'
import useOrdersTable from 'src/hooks/tableColumns/useOrdersTable'
import Auth from 'src/state/Auth'

const Index = () => {
  const { data: orders, isLoading: ordersIsLoading } = useListOrders()
  const tableColumns = useOrdersTable()
  if (ordersIsLoading) {
    return <div>loading</div>
  }
  return (
    <div className="p-2 bg-white rounded-2xl w-full">
      <div className="flex justify-between items-center">
        <h1 className="my-5 font-medium">Orders</h1>
        <Link to="/sell">
          <Button className="bg-sky text-sm">New order</Button>
        </Link>
      </div>

      <DataTable
        columns={tableColumns}
        data={orders}
        isSearchable={false}
        searchField="_id"
        searchFieldPlaceholder="Filter order"
      />
    </div>
  )
}

export default Index
