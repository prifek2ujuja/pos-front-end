import { State } from '@hookstate/core'
import { LuHeartPulse } from 'react-icons/lu'
import useOrderItemsTable from 'src/hooks/tableColumns/useOrderItemsTable'
import DataTable from 'src/pages/dashboard/components/DataTable'
import { OrderItem } from 'src/types'

type Props = {
  orderItems: State<OrderItem[]>
  removeFromCart: (productId: string) => void
}

const OrderItemsSummary = ({ orderItems, removeFromCart }: Props) => {
  const tableColumns = useOrderItemsTable(removeFromCart)
  return (
    <div className="my-20 h-fit grow cursor-pointer">
      <DataTable
        columns={tableColumns}
        data={orderItems.value as OrderItem[]}
        isSearchable={false}
        noResultText={
          <div className="flex items-center gap-2 justify-center">
            <p className="">Nothing here</p>
            <LuHeartPulse className="text-yellow-500 animate-pulse duration-1000" size={28} />
          </div>
        }
      />
    </div>
  )
}

export default OrderItemsSummary
