import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'

type SubmitData = {
  productId: string
}
const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId }: SubmitData) => {
      const response = await axios.delete(`products/${productId}`)
      return response.data
    },
    onError: () => {
      toast.error('Unable to delete document')
    },
    onSuccess: () => {
      toast.success('Document deleted')
      queryClient.invalidateQueries(['products'])
    },
  })
}

export default useDeleteProduct
