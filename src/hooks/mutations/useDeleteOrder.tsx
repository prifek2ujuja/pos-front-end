import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'

const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      const response = await axios.delete(`orders/${orderId}`)
      return response.data
    },
    onError: () => {
      toast.error('Unable to remove document')
    },
    onSuccess: () => {
      toast.success('Order deleted')
      queryClient.invalidateQueries(['orders'])
    },
  })
}

export default useDeleteOrder
