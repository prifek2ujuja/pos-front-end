import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'

type ResponseData = {
  _id: string
  name: string
  price: number
  description: string
  productImage: string
  stock: number
}

const useListProducts = () => {
  return useQuery<ResponseData[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('products')
      return response.data
    },
    staleTime: 30 * 60 * 60,
  })
}

export default useListProducts
