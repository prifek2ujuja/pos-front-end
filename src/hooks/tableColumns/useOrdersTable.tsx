import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { Button } from 'src/components/ui/button'
import { OrderItem } from 'src/types'
import dayjs from 'dayjs'
import useDeleteOrder from '../mutations/useDeleteOrder'
import { useNavigate } from 'react-router-dom'
import Auth from 'src/state/Auth'

const useOrdersTable = () => {
  const { mutate: deleteOrder } = useDeleteOrder()
  const navigate = useNavigate()
  const redirectToEditOrder = (data: any) => {
    navigate('/sell', {
      state: data,
    })
  }
  const tableColumns: ColumnDef<{
    _id: string
    paymentMode: string
    orderTotal: number
    orderItems: OrderItem[]
    createdAt: string
    delivery: string
    customerId: string
  }>[] = [
    {
      accessorKey: 'orderItems',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Order items</p>,
      cell: ({ row }) => {
        const orderItems: OrderItem[] = row.getValue('orderItems')
        return (
          <div>
            {orderItems.map((item) => (
              <p key={crypto.randomUUID()} className="text-sm text-black">
                {item.product.name}
              </p>
            ))}
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
    {
      accessorKey: 'orderTotal',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Order Total</p>,
      cell: ({ row }) => {
        const orderTotal: number = row.getValue('orderTotal')
        return <p className="">Ksh. {orderTotal}</p>
      },
    },
    {
      accessorKey: 'paymentMode',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Payment</p>,
      cell: ({ row }) => {
        const paymentMode: string = row.getValue('paymentMode')
        return <p className="">{paymentMode}</p>
      },
    },
    {
      accessorKey: 'delivery',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Delivery</p>,
      cell: ({ row }) => {
        const delivery: string = row.getValue('delivery')
        return <p className="">{delivery}</p>
      },
    },
    {
      accessorKey: 'refCode',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Ref code</p>,
      cell: ({ row }) => {
        const refCode: string = row.getValue('refCode')
        return <p className="">{refCode}</p>
      },
    },
    {
      accessorKey: '_id',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Action</p>,
      cell: ({ row }) => {
        const orderId: string = row.getValue('_id')
        const orderItems = row.getValue('orderItems')
        const paymentMode = row.getValue('paymentMode')
        const refCode = row.getValue('refCode')
        return (
          <div>
            {Auth.role.value === 'admin' ? (
              <>
                <Button
                  onClick={() => {
                    redirectToEditOrder({
                      orderId,
                      orderItems,
                      paymentMode,
                      refCode,
                    })
                  }}
                  className="bg-white text-sky border-none shadow-none hover:bg-light-gray"
                >
                  <FaRegEdit />
                </Button>
                <Button
                  onClick={() => deleteOrder({ orderId })}
                  className="bg-white text-destructive border-none shadow-none hover:bg-light-gray"
                >
                  <AiOutlineDelete />
                </Button>
              </>
            ) : Auth.role.value === 'manager' ? (
              <Button
                onClick={() => {
                  redirectToEditOrder({
                    orderId,
                    orderItems,
                    paymentMode,
                    refCode,
                  })
                }}
                className="bg-white text-sky border-none shadow-none hover:bg-light-gray"
              >
                <FaRegEdit />
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => deleteOrder({ orderId })}
                className="bg-white text-destructive border-none shadow-none hover:bg-light-gray"
              >
                <AiOutlineDelete />
              </Button>
            )}
          </div>
        )
      },
    },
  ]
  return tableColumns
}

export default useOrdersTable
