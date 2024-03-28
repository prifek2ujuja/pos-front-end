import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

const useListOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axios('orders')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useListOrders
