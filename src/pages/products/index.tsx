import { Button } from 'src/components/ui/button'
import DataTable from '../dashboard/components/DataTable'
import { Link } from 'react-router-dom'
import useProductsTable from 'src/hooks/tableColumns/useProductsTable'
import useListProducts from 'src/hooks/queries/useListProducts'
import Auth from 'src/state/Auth'
import { Product } from 'src/types'
import { LoadingCard } from 'src/components/loading'

const Index = () => {
  const tableColumns = useProductsTable()
  const { data, isLoading, isFetched, isError } = useListProducts()
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
      {isLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <DataTable
          columns={tableColumns}
          data={data as Product[]}
          isSearchable={false}
          searchField="_id"
          searchFieldPlaceholder="Filter order"
        />
      ) : null}
    </div>
  )
}

export default Index
