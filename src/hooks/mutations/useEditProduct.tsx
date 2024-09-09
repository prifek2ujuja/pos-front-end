import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import axios from 'src/api/axios'
import { ErrorResponse } from 'src/types'

type SubmitData = {
  productId: string
  data: {
    name?: string
    description?: string
    price?: number
    stock?: number
    imageUrl?: string
    imagePath?: string
    category?: string
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
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
    onSuccess: () => {
      toast.success('Document saved')
      queryClient.invalidateQueries(['products'])
    },
  })
}

export default useEditProduct
