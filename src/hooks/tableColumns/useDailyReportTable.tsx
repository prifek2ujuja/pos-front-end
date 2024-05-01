import { DailyProductReport, Product } from 'src/types'
import { ColumnDef } from '@tanstack/react-table'

const useDailyReportTable = () => {
  const tableColumns: ColumnDef<DailyProductReport>[] = [
    {
      accessorKey: 'productInfo',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Product</p>,
      cell: ({ row }) => {
        const product: Product[] = row.getValue('productInfo')
        return (
          <div>
            <p>{product[0].name}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'openingStock',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Opening stock</p>,
      cell: ({ row }) => {
        const openingStock: string = row.getValue('openingStock')
        return (
          <div>
            <p>{openingStock}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'closingStock',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Closing stock</p>,
      cell: ({ row }) => {
        const closingStock: string = row.getValue('closingStock')
        return (
          <div>
            <p>{closingStock}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'addedStock',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Added stock</p>,
      cell: ({ row }) => {
        const addedStock: string = row.getValue('addedStock')
        return (
          <div>
            <p>{addedStock}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'sales',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Sales</p>,
      cell: ({ row }) => {
        const sales: string = row.getValue('sales')
        return (
          <div>
            <p>{sales}</p>
          </div>
        )
      },
    },
  ]
  return tableColumns
}

export default useDailyReportTable
