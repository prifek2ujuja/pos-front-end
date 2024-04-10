import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { ErrorResponse } from 'src/types'
import axios from 'src/api/axios'

type SubmitData = {
  productPrice: number
  productName: string
  productDescription: string
  stock: number
  imageUrl: string
  imagePath: string
}

const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('/products', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('New product saved')
      queryClient.invalidateQueries(['products'])
    },
    onError: (e: AxiosError) => {
      const errorResponse = e.response?.data as ErrorResponse
      toast.error(errorResponse.message)
    },
  })
}

export default useCreateProduct
