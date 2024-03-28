import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'src/api/axios'
import toast from 'react-hot-toast'
import { Product } from 'src/types'

type SubmitData = {
  orderId: string
  data: {
    customer?: {
      name?: string
      phone?: string
    }
    orderItems?: {
      product: Product
      quantity: number
    }[]
    paymentMode?: string
    refCode?: string
    orderTotal?: number
  }
}

const useEditOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ orderId, data }: SubmitData) => {
      const response = await axios.put(`orders/${orderId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    },
    onError: () => {
      toast.error('Unable to update document')
    },
    onSuccess: () => {
      toast.success('Document saved')
      queryClient.invalidateQueries(['orders'])
    },
  })
}

export default useEditOrder
