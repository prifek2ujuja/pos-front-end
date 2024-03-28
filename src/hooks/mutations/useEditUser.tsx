import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'src/api/axios'

type SubmitData = {
  id: string
  editData: {
    userName?: string
    phoneNumber?: string
    password?: string
    email?: string
    role?: string
    status?: string
  }
}
const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      console.log('submit data ', data)
      const response = await axios.put(`users/${data.id}`, data.editData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Document saved')
      queryClient.invalidateQueries(['users'])
    },
    onError: () => {
      toast.error('Unable to save document')
    },
  })
}

export default useEditUser
