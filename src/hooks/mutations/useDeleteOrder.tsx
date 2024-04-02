import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import { ErrorResponse } from 'src/types'
import { AxiosError } from 'axios'

const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      const response = await axios.delete(`orders/${orderId}`)
      return response.data
    },
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
    onSuccess: () => {
      toast.success('Order deleted')
      queryClient.invalidateQueries(['orders'])
    },
  })
}

export default useDeleteOrder
