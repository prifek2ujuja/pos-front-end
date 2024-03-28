import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type ResponseData = {
  userName: string
  phoneNumber: string
  email: string
  notifications: string[]
  avatar: string
}

const useUserProfile = (profileId: string) => {
  return useQuery<ResponseData>({
    queryKey: ['users', profileId],
    queryFn: async () => {
      const response = await axios(`users/${profileId}`)
      return response.data
    },
    staleTime: 180000,
  })
}

export default useUserProfile
