import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'
import { User } from 'src/types'

const useSalesLeaderboard = () => {
  return useQuery<User[]>({
    queryKey: ['orders', 'sales', 'leaderboard'],
    queryFn: async () => {
      const response = await axios('users/sales/leaderboard')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useSalesLeaderboard
