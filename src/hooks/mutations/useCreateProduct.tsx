import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

type SubmitData = {
  productPrice: number
  productName: string
  productDescription: string
  stock: number
}

const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: SubmitData) => {
      const response = await axios.post('http://localhost:3000/api/products', data, {
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
    onError: () => {
      toast.success('Unable to save product')
    },
  })
}

export default useCreateProduct
