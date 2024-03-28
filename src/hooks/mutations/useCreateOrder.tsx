import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import { Product } from 'src/types'

type SubmitData = {
  customer?: {
    name?: string
    phone?: string
  }
  orderItems: {
    product: Product
    quantity: number
  }[]
  paymentMode: string
  refCode: string
  orderTotal: number
}

const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('orders', data)
      return response.data
    },
    onSuccess: () => {
      toast.success('New order saved')
      queryClient.invalidateQueries(['products'])
      queryClient.invalidateQueries(['orders'])
    },
    onError: () => {
      toast.error('Unable to save product')
    },
  })
}

export default useCreateOrder
