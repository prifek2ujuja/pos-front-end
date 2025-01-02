import React from 'react'
import useProductOrderStats from 'src/hooks/queries/useProductOrderStats'

const ProductsOrdersStats = () => {
  const { data, isLoading } = useProductOrderStats()
  console.log('stats', data)
  return <div>ProductsOrdersStats</div>
}

export default ProductsOrdersStats
