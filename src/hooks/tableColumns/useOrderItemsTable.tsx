import { ColumnDef } from '@tanstack/react-table'
import { TbShoppingCartMinus } from 'react-icons/tb'
import { OrderItem, Product } from 'src/types'

const useOrderItemsTable = (removeFromCart: (productId: string) => void) => {
  const tableColumns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: 'product',
      header: () => <p>Product</p>,
      cell: ({ row }) => {
        const product: Product = row.getValue('product')
        return (
          <div className="flex items-center gap-3 max-w-[150px]">
            <img
              src="https://avatars.githubusercontent.com/u/85338332"
              alt="product-image"
              className="h-10 w-10 rounded-full"
            />
            <p className="text-sm truncate">{product.name}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'quantity',
      header: () => <p>Quantity</p>,
      cell: ({ row }) => {
        const quantity: number = row.getValue('quantity')
        return (
          <div className="flex h-5 w-5 items-center justify-center text-white font-medium text-sm bg-sky rounded-full">
            <p>{quantity}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'product',
      header: () => <p>#</p>,
      cell: ({ row }) => {
        const product: Product = row.getValue('product')
        return (
          <button
            type="button"
            onClick={() => removeFromCart(product._id)}
            className="text-red-500 hover:bg-red-500 hover:text-white rounded-lg p-3 self-start"
          >
            <TbShoppingCartMinus />
          </button>
        )
      },
    },
  ]
  return tableColumns
}

export default useOrderItemsTable
