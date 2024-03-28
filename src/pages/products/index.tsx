import { Button } from 'src/components/ui/button'
import DataTable from '../dashboard/components/DataTable'
import { Link } from 'react-router-dom'
import useProductsTable from 'src/hooks/tableColumns/useProductsTable'
import useListProducts from 'src/hooks/queries/useListProducts'
import Auth from 'src/state/Auth'

const Index = () => {
  const tableColumns = useProductsTable()
  const { data, isLoading } = useListProducts()
  if (isLoading) {
    return <div>Loading</div>
  }
  return (
    <div className="p-2 bg-white rounded-2xl w-full">
      <div className="flex justify-between items-center">
        <h1 className="my-5 font-medium">Products</h1>
        {(Auth.role.value === 'admin' || Auth.role.value === 'manager') && (
          <Link to="/newproduct">
            <Button className="bg-sky text-sm">New product</Button>
          </Link>
        )}
      </div>
      <DataTable
        columns={tableColumns}
        data={data}
        isSearchable={true}
        searchField="name"
        searchFieldPlaceholder="Filter order"
      />
    </div>
  )
}

export default Index
