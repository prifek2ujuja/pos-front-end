import { FaEdit, FaTrash } from 'react-icons/fa'
import { LoadingCard } from 'src/components/loading'
import useProductImages from 'src/hooks/queries/useProductImages'
import { IoStar } from 'react-icons/io5'

const ProductImages = ({ productId }: { productId: string }) => {
  const { data, isLoading, isError, isFetched } = useProductImages(productId)
  return (
    <div className="mt-5 md:mt-14">
      <h1 className="my-4 text-lg font-medium">Product images</h1>
      {isLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <div className="flex items-center flex-wrap">
          {data.map((image) => (
            <div key={crypto.randomUUID()} className="w-56 md:w-72 h-56 md:h-72 relative">
              <img src={image.imageUrl} className="w-full h-full rounded-lg" />
              <div className="absolute flex items-center gap-2 p-4 w-fit top-0 right-0">
                <button className="text-white">
                  <IoStar size={23} />
                </button>
                <button className="text-red-500">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProductImages
