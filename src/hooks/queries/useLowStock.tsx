import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'
import { Product } from 'src/types'

const useLowStock = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'low-stock'],
    queryFn: async () => {
      const response = await axios.get('products/lowstock')
      return response.data
    },
    staleTime: 30 * 60 * 60,
  })
}

export default useLowStock
