import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'
import { Order } from 'src/types'

const useListRecentOrders = () => {
  return useQuery<Order[]>({
    queryKey: ['orders', 'recent'],
    queryFn: async () => {
      const response = await axios('orders/recent')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useListRecentOrders
