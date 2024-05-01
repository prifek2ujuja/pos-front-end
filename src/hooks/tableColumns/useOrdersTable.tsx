import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { Button } from 'src/components/ui/button'
import { OrderItem, User } from 'src/types'
import dayjs from 'dayjs'
import useDeleteOrder from '../mutations/useDeleteOrder'
import { useNavigate } from 'react-router-dom'
import useDecodeToken from '../useDecodeToken'

const useOrdersTable = () => {
  const { mutate: deleteOrder } = useDeleteOrder()
  const navigate = useNavigate()
  const tokenData = useDecodeToken()
  const role = tokenData?.role
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
    salesPerson: User
  }>[] = [
    {
      accessorKey: 'orderItems',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Order items</p>,
      cell: ({ row }) => {
        const orderItems: OrderItem[] = row.getValue('orderItems')
        return (
          <div className="flex -space-x-4 overflow-hidden">
            {orderItems.map((item) => (
              <img
                key={crypto.randomUUID()}
                src={
                  item.product.productImages && item.product.productImages[0]
                    ? item.product.productImages[0].imageUrl
                    : item.product.productImage
                }
                className={`rounded-full h-10 inline-block w-10`}
              />
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Date</p>,
      cell: ({ row }) => {
        const date: string = row.getValue('createdAt')
        return <p className="text-sm">{dayjs(date).format('YYYY-MM-DD')}</p>
      },
    },
    {
      accessorKey: 'orderTotal',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Order Total</p>,
      cell: ({ row }) => {
        const orderTotal: number = row.getValue('orderTotal')
        return <p className="">Ksh. {orderTotal}</p>
      },
    },
    {
      accessorKey: 'paymentMode',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Payment</p>,
      cell: ({ row }) => {
        const paymentMode: string = row.getValue('paymentMode')
        return <p className="">{paymentMode}</p>
      },
    },
    {
      accessorKey: 'delivery',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Delivery</p>,
      cell: ({ row }) => {
        const delivery: string = row.getValue('delivery')
        return <p className="">{delivery}</p>
      },
    },
    {
      accessorKey: 'refCode',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Ref code</p>,
      cell: ({ row }) => {
        const refCode: string = row.getValue('refCode')
        return <p className="">{refCode}</p>
      },
    },
    {
      accessorKey: 'salesPerson',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Sales</p>,
      cell: ({ row }) => {
        const salesPerson: User = row.getValue('salesPerson')
        return <p className="">{salesPerson?.userName}</p>
      },
    },
    {
      accessorKey: '_id',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Action</p>,
      cell: ({ row }) => {
        const orderId: string = row.getValue('_id')
        const orderItems = row.getValue('orderItems')
        const paymentMode = row.getValue('paymentMode')
        const refCode = row.getValue('refCode')
        return (
          <div>
            {role === 'admin' ? (
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
            ) : role === 'manager' ? (
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
