import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { Button } from 'src/components/ui/button'
import useDeleteProduct from '../mutations/useDeleteProduct'
import { Product, ProductImage } from 'src/types'
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
        return <img src={source} alt="product-image" className="h-10 w-10 object-cover rounded-full" />
      },
    },
    {
      accessorKey: 'name',
      header: () => <p className="text-sm uppercase text-primary font-medium">Name</p>,
      cell: ({ row }) => {
        const product: string = row.getValue('name')
        return <p className="text-sm truncate max-w-[100px]">{product}</p>
      },
    },
    {
      accessorKey: 'category',
      header: () => <p className="text-sm uppercase text-primary font-medium">Category</p>,
      cell: ({ row }) => {
        const category: string = row.getValue('category')
        return <p className="text-sm">{category}</p>
      },
    },
    {
      accessorKey: 'price',
      header: () => <p className="text-sm uppercase text-primary font-medium">Price</p>,
      cell: ({ row }) => {
        const price: string = row.getValue('price')
        const formattedPrice = parseInt(price).toLocaleString('en-US')
        return <p className="text-sm">ksh {formattedPrice}</p>
      },
    },
    {
      accessorKey: 'stock',
      header: () => <p className="text-sm uppercase text-primary font-medium">Shelf</p>,
      cell: ({ row }) => {
        const product: Product = row.original
        console.log('product :', product)
        const backOfficeStock: string = product.stock.toString()
        const inStoreStock: string = product.inStore.toString()
        const productId: string = product._id
        const productName: string = product.name
        return (
          <div className="flex gap-1 items-center">
            <p className="text-sm">{inStoreStock || 0}</p>
            {(role === 'manager' || role === 'admin') && (
              <EditStock
                inStoreStock={parseInt(inStoreStock)}
                productId={productId}
                backOfficeStock={parseInt(backOfficeStock)}
                productName={productName}
              />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'stock',
      header: () => <p className="text-sm uppercase text-primary font-medium">Back office</p>,
      cell: ({ row }) => {
        const product: Product = row.original
        console.log('product :', product)
        const backOfficeStock: string = product.stock.toString()
        const inStoreStock: string = product.inStore.toString()
        const productId: string = product._id
        const productName: string = product.name
        return (
          <div className="flex gap-1 items-center">
            <p className="text-sm">{backOfficeStock || 0}</p>
            {(role === 'manager' || role === 'admin') && (
              <EditStock
                inStoreStock={parseInt(inStoreStock)}
                productId={productId}
                backOfficeStock={parseInt(backOfficeStock)}
                productName={productName}
              />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'description',
      header: () => <p className="text-sm uppercase text-primary font-medium">Description</p>,
      cell: ({ row }) => {
        const description: string = row.getValue('description')
        return <p className="text-sm truncate max-w-[200px]">{description}</p>
      },
    },
    {
      accessorKey: '_id',
      header: () => <p className="text-sm uppercase text-primary font-medium">Action</p>,
      cell: ({ row }) => {
        const product: Product = row.original
        const productId: string = product._id
        const description: string = product.description
        const stock: string = product.stock.toString()
        const name: string = product.name
        const productImages: ProductImage[] | undefined = product.productImages
        const productAvatar = 'https://avatars.githubusercontent.com/u/62663992'
        const productImage = productImages && productImages.length > 0 ? productImages[0].imageUrl : productAvatar
        const price: string = product.price.toString()
        const data = {
          productId,
          description,
          stock,
          name,
          productImage,
          price,
          benefits: product.benefits,
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
