/* eslint-disable no-constant-condition */
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { createProductSchema } from 'src/schemas'
import { Button } from 'src/components/ui/button'
import { Textarea } from 'src/components/ui/textarea'
import useCreateProduct from 'src/hooks/mutations/useCreateProduct'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useEditProduct from 'src/hooks/mutations/useEditProduct'
import { useDropzone } from 'react-dropzone'
// import { useCallback } from 'react'
import { getHeaderLayout } from 'src/components/layout'
import { FaArrowLeft } from 'react-icons/fa'
import useUploadImage from 'src/hooks/imageupload'
import { useCallback, useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import ProductImages from './components/ProductImages'

type FormValues = z.infer<typeof createProductSchema>
const Index = () => {
  const { state } = useLocation()
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  const [imageError, setImageError] = useState<string>()

  const { uploadFile, progress, downloadURL, imagePath } = useUploadImage()
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (acceptedFiles[0].size > 3145728) {
        setImageError('File size exceeds limit of 3MB')
        return
      }
      setImageError('')
      uploadFile(acceptedFiles[0])
    },
    [uploadFile],
  )
  const { getInputProps, getRootProps } = useDropzone({ onDrop })

  const navigate = useNavigate()
  const orderForm = useForm<FormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productDescription: state ? state.description : '',
      productName: state ? state.name : '',
      productPrice: state ? parseInt(state.price) : 0,
      stock: state ? parseInt(state.stock) : 0,
    },
  })

  const { mutateAsync: createProduct, isLoading: createProductIsLoading } = useCreateProduct()
  const { mutateAsync: editProduct, isLoading: editProductIsLoading } = useEditProduct()

  if (role !== 'admin' && role !== 'manager') {
    return <Navigate to="/dashboard" />
  }
  const onFormSubmitReady = async (data: FormValues) => {
    const payload = {
      description: data.productDescription,
      name: data.productName,
      price: data.productPrice,
      stock: data.stock,
    }
    // if (downloadURL && imagePath) {
    //   payload.imageUrl = downloadURL
    //   payload.imagePath = imagePath
    // }
    if (state) {
      editProduct({ data: payload, productId: state.productId })
    } else {
      if (!downloadURL || !imagePath) {
        setImageError('Please upload an image for the product')
        return
      }
      await createProduct({
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: data.productPrice,
        stock: data.stock,
        imageUrl: downloadURL,
        imagePath,
      })
      orderForm.reset()
    }
  }
  return (
    <div className="w-full poppins-regular">
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-2 items-center mb-10">
          <Button
            onClick={() => navigate(-1)}
            className="bg-light-gray shadow-none text-black hover:bg-light-gray hover:text-sky"
          >
            <FaArrowLeft />
          </Button>
          <h1 className="text-lg font-medium">New product</h1>
        </div>

        <Form {...orderForm}>
          <form
            className="p-2 rounded-2xl bg-white shadow-xl flex flex-col md:flex-row mx-auto md:p-4 lg:p-8"
            action=""
            onSubmit={orderForm.handleSubmit(onFormSubmitReady)}
          >
            <div className="w-full md:w-1/2 min-h-full flex justify-center items-center">
              <FormItem className="mb-4 w-full h-full">
                {/* <FormLabel>Product image</FormLabel> */}
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="h-full flex flex-col items-center justify-center bg-light-gray rounded-xl max-w-6xl cursor-pointer"
                  >
                    <input
                      {...getInputProps()}
                      className="w-full cursor-pointer flex items-center justify-center bg-light-gray rounded-xl h-40"
                    />
                    {downloadURL ? (
                      <img src={downloadURL} alt="product-image" className="h-full object-cover rounded-lg w-full" />
                    ) : state.productImage ? (
                      <img
                        src={state.productImage}
                        alt="product-image"
                        className="h-full object-cover rounded-lg w-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-6 h-full">
                        <MdAddAPhoto size={40} className="text-sky" />
                        <p className="text-center">Drag and drop an image of click to select image</p>
                        {progress !== 0 && <p className="text-base lg:text-lg text-center">{progress}%</p>}
                      </div>
                    )}
                    {imageError && <p className="text-red-500 text-sm font-medium">{imageError}</p>}
                  </div>
                </FormControl>
                <FormDescription>Product image.</FormDescription>
              </FormItem>
            </div>
            <div className="flex flex-col w-full md:w-1/2 px-4">
              <div className="flex flex-col md:flex-row mb-4 gap-4">
                <FormField
                  control={orderForm.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="mb-2">Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="Prostemcell" {...field} className="focus:border-none" />
                      </FormControl>
                      <FormDescription>Product name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row mb-4 gap-4">
                <FormField
                  control={orderForm.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Product price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5000"
                          className="focus:border-none"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Product price.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row mb-4 gap-4">
                <FormField
                  control={orderForm.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Product stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25"
                          className="focus:border-none"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Product stock.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={orderForm.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Product description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="focus:border-none" />
                      </FormControl>
                      <FormDescription>Product description.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-10 flex flex-col md:flex-row gap-4">
                {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
                <Button
                  disabled={createProductIsLoading || editProductIsLoading || !orderForm.formState.isDirty}
                  type="submit"
                  className="w-full bg-sky flex items-center"
                >
                  {createProductIsLoading || editProductIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save'}
                </Button>
                <Button
                  type="button"
                  className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
        {state.productId && <ProductImages productId={state.productId} />}
      </div>
    </div>
  )
}

export default Index

Index.getLayout = getHeaderLayout
