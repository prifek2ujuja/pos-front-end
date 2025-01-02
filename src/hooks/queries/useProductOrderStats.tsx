import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type ProductOrderStat = {
  productId: string
  orderCount: number
}

const useProductOrderStats = () => {
  return useQuery<ProductOrderStat[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('orders/products/stats')
      return response.data
    },
    staleTime: 30 * 60 * 60,
  })
}

export default useProductOrderStats
