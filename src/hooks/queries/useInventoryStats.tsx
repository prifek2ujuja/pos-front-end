import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type Stats = {
  totalBackOfficeValue: number
  totalStoreValue: number
  totalValue: number
  numberOfProductsInBackOffice: number
  numberOfProductsInStore: number
}

const useInventoryStats = () => {
  return useQuery<Stats>({
    queryKey: ['products', 'stats'],
    queryFn: async () => {
      const response = await axios('products/stats')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useInventoryStats
