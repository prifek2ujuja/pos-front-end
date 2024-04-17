import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { Button } from 'src/components/ui/button'
import useDeleteProduct from '../mutations/useDeleteProduct'
import { Product } from 'src/types'
import { useNavigate } from 'react-router-dom'
import EditStock from 'src/pages/products/components/EditStock'
import useDecodeToken from '../useDecodeToken'

type EditData = {
  productId: string
  description: string
  stock: string
  name: string
  productImage: string
  price: string
}

const useProductsTable = () => {
  const { mutate: deleteProduct } = useDeleteProduct()
  const navigate = useNavigate()
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  const redirectToEditForm = (state: EditData) => {
    navigate('/newproduct', { state })
  }

  const tableColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'productImages',
      header: () => <p></p>,
      cell: ({ row }) => {
        const productImages: { imagePath: string; imageUrl: string }[] = row.getValue('productImages')
        const productAvatar = 'https://avatars.githubusercontent.com/u/62663992'
        const source = productImages.length > 0 ? productImages[0].imageUrl : productAvatar
        return <img src={source} alt="product-image" className="h-10 w-10 rounded-full" />
      },
    },
    {
      accessorKey: 'name',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Product</p>,
      cell: ({ row }) => {
        const product: string = row.getValue('name')
        return <p className="text-sm">{product}</p>
      },
    },
    {
      accessorKey: 'price',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Price</p>,
      cell: ({ row }) => {
        const price: string = row.getValue('price')
        return <p className="text-sm">ksh {price}</p>
      },
    },
    {
      accessorKey: 'stock',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Stock</p>,
      cell: ({ row }) => {
        const stock: string = row.getValue('stock')
        const productId: string = row.getValue('_id')
        const productName: string = row.getValue('name')
        return (
          <div className="flex gap-1 items-center">
            <p className="text-sm">{stock || 0}</p>
            {(role === 'manager' || role === 'admin') && (
              <EditStock productId={productId} stock={parseInt(stock)} productName={productName} />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'description',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Description</p>,
      cell: ({ row }) => {
        const description: string = row.getValue('description')
        return <p className="text-sm truncate max-w-[200px]">{description}</p>
      },
    },
    {
      accessorKey: '_id',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Action</p>,
      cell: ({ row }) => {
        const productId: string = row.getValue('_id')
        const description: string = row.getValue('description')
        const stock: string = row.getValue('stock')
        const name: string = row.getValue('name')
        const productImages: { imagePath: string; imageUrl: string }[] = row.getValue('productImages')
        const productAvatar = 'https://avatars.githubusercontent.com/u/62663992'
        const productImage = productImages.length > 0 ? productImages[0].imageUrl : productAvatar
        const price: string = row.getValue('price')
        const data = {
          productId,
          description,
          stock,
          name,
          productImage,
          price,
        }
        return (
          <div>
            {role === 'admin' ? (
              <>
                <Button
                  onClick={() => redirectToEditForm(data)}
                  className="bg-white text-sky border-none shadow-none hover:bg-light-gray"
                >
                  <FaRegEdit />
                </Button>
                <Button
                  onClick={() => deleteProduct({ productId })}
                  className="bg-white text-destructive border-none shadow-none hover:bg-light-gray"
                >
                  <AiOutlineDelete />
                </Button>
              </>
            ) : role === 'manager' ? (
              <Button
                onClick={() => redirectToEditForm(data)}
                className="bg-white text-sky border-none shadow-none hover:bg-light-gray"
              >
                <FaRegEdit />
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => redirectToEditForm(data)}
                className="bg-white text-sky border-none shadow-none hover:bg-light-gray"
              >
                <FaRegEdit />
              </Button>
            )}
          </div>
        )
      },
    },
  ]
  return tableColumns
}

export default useProductsTable
