import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type ResponseData = {
  _id: {
    year: number
    month: number
  }
  total: number
}
const useOrdersGraphData = () => {
  return useQuery<ResponseData[]>({
    queryKey: ['orders', 'graph'],
    queryFn: async () => {
      const response = await axios('orders/trends')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useOrdersGraphData
