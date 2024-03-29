import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'
import { Product } from 'src/types'

const useListProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('products')
      return response.data
    },
    staleTime: 30 * 60 * 60,
  })
}

export default useListProducts
