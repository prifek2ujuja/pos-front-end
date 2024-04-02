import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type Stat = {
  _id: null
  totalValue: number
  totalOrders: number
}

type ResponseData = {
  ordersInLastOneWeek: Stat
  ordersInLastTwentyFourHours: Stat
  allTimeOrders: Stat
}
const useOrderStats = () => {
  return useQuery<ResponseData>({
    queryKey: ['orders', 'stats'],
    queryFn: async () => {
      const response = await axios('orders/stats')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useOrderStats
