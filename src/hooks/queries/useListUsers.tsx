import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

const useListUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios('users')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useListUsers
