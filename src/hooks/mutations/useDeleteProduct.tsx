import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import { ErrorResponse } from 'src/types'
import { AxiosError } from 'axios'

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
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
    onSuccess: () => {
      toast.success('Document deleted')
      queryClient.invalidateQueries(['products'])
    },
  })
}

export default useDeleteProduct
