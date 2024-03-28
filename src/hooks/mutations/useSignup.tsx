import { useMutation } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import Auth from '../../state/Auth'

type SubmitData = {
  userName: string
  phoneNumber: string
  password: string
  email: string
  role?: string
  status?: string
}

const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('users', data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Account created')
    },
    onError: () => {
      toast.error('Unable to create account')
    },
  })
}

export default useSignup
