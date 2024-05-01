import { ImmutableObject } from '@hookstate/core'
import React from 'react'
import { Button } from 'src/components/ui/button'
import { OrderItem, Product } from 'src/types'

type Props = {
  product: Product
  selected?: ImmutableObject<OrderItem>
  addToCart: (product: Product) => void
}

const ProductCard = ({ product, selected, addToCart }: Props) => {
  return (
    <Button
      type="button"
      key={crypto.randomUUID()}
      className={`relative hover:bg-white flex flex-col p-0 text-black hover:text-black w-full rounded-lg  ${
        selected ? ' border-1 border-sky shadow-xl' : 'shadow-lg'
      } h-fit  bg-light-gray cursor-pointer`}
      onClick={() => addToCart(product)}
    >
      <div className="flex px-2 justify-start items-center gap-3 w-full my-2">
        <p className="font-medium flex items-center gap-1 text-md">{product.name} </p>
        {selected && <div className="bg-sky rounded-full h-4 w-4 text-xs text-white">{selected.quantity}</div>}
      </div>

      <img
        src={
          product.productImages && product.productImages[0] ? product.productImages[0].imageUrl : product.productImage
        }
        alt="product-image"
        className="w-full h-40 rounded-lg object-cover"
      />
      <div className="flex flex-col px-2 justify-between items-start w-full text-sm my-2">
        <p className="font-medium text-sm md:text-md">ksh {product.price}</p>
      </div>
    </Button>
  )
}

export default ProductCard
