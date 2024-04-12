import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ErrorResponse } from 'src/types'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'

const useDeleteProductImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productImageId }: { productImageId: string }) => {
      const response = await axios.delete(`products/images/${productImageId}`)
      return response.data
    },
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
      toast.success('Unable to delete image data')
    },
    onSuccess: (data, variables) => {
      toast.success('Image data deleted')
      queryClient.invalidateQueries(['product', 'images', variables.productImageId])
    },
  })
}

export default useDeleteProductImage
