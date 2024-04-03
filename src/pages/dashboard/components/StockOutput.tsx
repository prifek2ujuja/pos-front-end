import DataTable from './DataTable'
import useProductsTable from 'src/hooks/tableColumns/useProductsTable'
import useLowStock from 'src/hooks/queries/useLowStock'
import { LuHeartPulse } from 'react-icons/lu'
import { Product } from 'src/types'
import useLowStockTable from 'src/hooks/tableColumns/useLowStockTable'

const StockOutput = () => {
  const tableColumns = useLowStockTable()
  const { data, isLoading } = useLowStock()
  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="w-full rounded-2xl p-2 bg-white shadow-xl">
      <h1 className="my-5 font-medium">Stock alert</h1>
      <DataTable
        columns={tableColumns}
        data={data as Product[]}
        isSearchable={false}
        noResultText={
          <div className="flex items-center gap-2 justify-center">
            <p className="md:text-lg">Healthy stock</p>
            <LuHeartPulse className="text-green-500 animate-pulse duration-1000" size={28} />
          </div>
        }
      />
    </div>
  )
}

export default StockOutput
