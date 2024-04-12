import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'src/api/axios'
import Auth from 'src/state/Auth'
import { ErrorResponse } from 'src/types'

const useLogout = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post('users/logout', {})
      return response.data
    },
    onSuccess: () => {
      toast.success('successfully logged out')
      Auth.set({
        authenticated: false,
        avatar: null,
        refreshToken: null,
        status: null,
        token: null,
        userName: null,
        id: null,
      })
      navigate('/')
    },
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
  })
}

export default useLogout
