import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'src/api/axios'

type SubmitData = {
  productId: string
  data: {
    productName?: string
    productDescription?: string
    productPrice?: number
    stock?: number
  }
}

const useEditProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, data }: SubmitData) => {
      const response = await axios.put(`products/${productId}`, data, {
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
      queryClient.invalidateQueries(['products'])
    },
  })
}

export default useEditProduct
