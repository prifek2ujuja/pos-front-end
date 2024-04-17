import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

const useSalesLeaderboard = () => {
  return useQuery({
    queryKey: ['orders', 'sales', 'leaderboard'],
    queryFn: async () => {
      const response = await axios('orders/leaderboard')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useSalesLeaderboard
