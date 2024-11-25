import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import axios from 'src/api/axios'
import { ErrorResponse } from 'src/types'

type SubmitData = {
  productId: string
  data: {
    amount: number
  }
}

const useAddStoreStock = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ productId, data }: SubmitData) => {
      const response = await axios.put(`products/${productId}/store`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    },
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
    onSuccess: () => {
      toast.success('Store updated')
      queryClient.invalidateQueries(['products'])
    },
  })
}

export default useAddStoreStock
