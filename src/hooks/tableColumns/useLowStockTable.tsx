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

const useLowStockTable = () => {
  const { mutate: deleteProduct } = useDeleteProduct()
  const navigate = useNavigate()
  const tokenData = useDecodeToken()
  const role = tokenData?.role

  const redirectToEditForm = (state: EditData) => {
    navigate('/newproduct', { state })
  }

  const tableColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'productImage',
      header: () => <p></p>,
      cell: ({ row }) => {
        const productImage: string = row.getValue('productImage')
        return <img src={productImage} alt="product-image" className="text-sm md:text-base h-10 w-10 rounded-full" />
      },
    },
    {
      accessorKey: 'name',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Product</p>,
      cell: ({ row }) => {
        const product: string = row.getValue('name')
        return <p className="text-sm">{product}</p>
      },
    },

    {
      accessorKey: 'stock',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Stock</p>,
      cell: ({ row }) => {
        const { stock: backOfficeStock, inStore: inStoreStock, _id: productId, name: productName } = row.original
        return (
          <div className="flex gap-1 items-center">
            <p className="text-sm">{inStoreStock || 0}</p>
            {(role === 'manager' || role === 'admin') && (
              <EditStock
                productId={productId}
                inStoreStock={inStoreStock}
                backOfficeStock={backOfficeStock}
                productName={productName}
              />
            )}
          </div>
        )
      },
    },

    {
      accessorKey: '_id',
      header: () => <p className="text-sm md:text-base text-gray font-semibold">Action</p>,
      cell: ({ row }) => {
        const productId: string = row.getValue('_id')
        const description: string = row.getValue('description')
        const stock: string = row.getValue('stock')
        const name: string = row.getValue('name')
        const productImage: string = row.getValue('productImage')
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

export default useLowStockTable
