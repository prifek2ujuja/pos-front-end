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
  const comafyPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <Button
      type="button"
      key={crypto.randomUUID()}
      className={`relative hover:bg-white flex flex-col p-0 text-black hover:text-black w-full rounded-lg  ${
        selected ? ' border-1 border-sky shadow-xl' : 'shadow-lg'
      } h-full max-h-72 bg-light-gray cursor-pointer`}
      onClick={() => addToCart(product)}
    >
      <div className="flex flex-col md:flex-row px-2 justify-start items-start md:items-center gap-3 w-full my-2">
        <p className={`font-medium text-start gap-1 text-md`}>{product.name} </p>
        {selected && <div className="bg-sky rounded-full h-4 w-4 text-xs text-white">{selected.quantity}</div>}
      </div>

      <img
        src="https://avatars.githubusercontent.com/u/85338332"
        alt="product-image"
        className="w-full h-40 rounded-lg object-cover"
      />
      <div className="flex flex-col px-2 justify-between items-start w-full text-sm my-2">
        <p className="font-medium text-sm md:text-md">ksh {comafyPrice(parseInt(product.price))}</p>
      </div>
    </Button>
  )
}

export default ProductCard
