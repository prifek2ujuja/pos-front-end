import { State } from '@hookstate/core'
import { TbShoppingCartMinus } from 'react-icons/tb'
import { OrderItem } from 'src/types'

type Props = {
  orderItems: State<OrderItem[]>
  removeFromCart: (productId: string) => void
}

const OrderItemsSummary = ({ orderItems, removeFromCart }: Props) => {
  return (
    <div className="mb-10 h-72 cursor-pointer">
      {orderItems.value.length === 0 ? (
        <div className="w-full flex items-center justify-center py-7 text-sm text-gray">
          <p>Click items to create a new order</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-medium text-sm">Product</th>
              <th className="text-left font-medium text-sm">Total</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {orderItems.value.map((item) => (
              <tr key={item.product._id}>
                <td className="text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.productImage}
                      className="h-5 w-5 rounded-full hidden md:block"
                      alt="product-image"
                    />
                    <p>
                      {item.product.name} ({item.quantity})
                    </p>
                  </div>
                </td>
                <td className="text-sm">{parseInt(item.product.price) * item.quantity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:bg-red-500 hover:text-white rounded-lg p-3"
                  >
                    <TbShoppingCartMinus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderItemsSummary
