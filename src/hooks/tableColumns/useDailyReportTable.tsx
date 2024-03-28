import dayjs from 'dayjs'
import { DailyProductReport } from 'src/types'
import { ColumnDef } from '@tanstack/react-table'

const useDailyReportTable = () => {
  const tableColumns: ColumnDef<DailyProductReport>[] = [
    {
      accessorKey: 'product',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Product</p>,
      cell: ({ row }) => {
        const product: string = row.getValue('product')
        return (
          <div>
            <p>{product}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'openingStock',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Opening stock</p>,
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
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Closing stock</p>,
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
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Added stock</p>,
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
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Sales</p>,
      cell: ({ row }) => {
        const sales: string = row.getValue('sales')
        return (
          <div>
            <p>{sales}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Date</p>,
      cell: ({ row }) => {
        const date: string = row.getValue('createdAt')
        return <p className="text-sm">{dayjs(date).format('YYYY-MM-DD')}</p>
      },
    },
  ]
  return tableColumns
}

export default useDailyReportTable
