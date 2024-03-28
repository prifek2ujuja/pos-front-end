import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

const useListDailyReports = () => {
  return useQuery({
    queryKey: ['daily-reports'],
    queryFn: async () => {
      const response = await axios('reports')
      return response.data
    },
    staleTime: 180000,
  })
}

export default useListDailyReports
