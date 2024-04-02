import { useMutation } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type SubmitData = {
  userName: string
  phoneNumber: string
  password: string
  email: string
  role?: string
  status?: string
}

const useSignup = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('users', data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Account created. You can now login')
      navigate('/login')
    },
    onError: () => {
      toast.error('Unable to create account')
    },
  })
}

export default useSignup
