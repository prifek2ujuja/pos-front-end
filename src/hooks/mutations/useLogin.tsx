import { useMutation } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import Auth from 'src/state/Auth'
import { useNavigate } from 'react-router-dom'

type SubmitData = {
  password: string
  email: string
}

const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('users/login', data)
      return response.data
    },
    onSuccess: (data) => {
      Auth.set({
        authenticated: true,
        avatar: data.avatar,
        refreshToken: data.refreshToken,
        role: data.role,
        status: data.status,
        token: data.token,
        userName: data.userName,
        id: data.id,
      })
      toast.success('Logged in')
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Unable to login. Please check your credentials and try again')
    },
  })
}

export default useLogin
