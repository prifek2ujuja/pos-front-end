import { useQuery } from '@tanstack/react-query'
import axios from 'src/api/axios'
import { ProductImage } from 'src/types'

const useProductImages = (productId: string) => {
  return useQuery<ProductImage[]>({
    queryKey: ['product', 'images', productId],
    queryFn: async () => {
      const response = await axios(`products/${productId}/images`)
      return response.data
    },
    staleTime: 180000,
  })
}

export default useProductImages
