import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'src/api/axios'
import Auth from 'src/state/Auth'

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
        role: null,
        status: null,
        token: null,
        userName: null,
        id: null,
      })
      navigate('/')
    },
    onError: () => {
      toast.error('unable to log out')
    },
  })
}

export default useLogout
