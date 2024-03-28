import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { createProductSchema } from 'src/schemas'
import { MdAddAPhoto } from 'react-icons/md'
import { Button } from 'src/components/ui/button'
import { Textarea } from 'src/components/ui/textarea'
import useCreateProduct from 'src/hooks/mutations/useCreateProduct'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useEditProduct from 'src/hooks/mutations/useEditProduct'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { getHeaderLayout, getNoneLayout } from 'src/components/layout'
import Auth from 'src/state/Auth'
import { FaArrowLeft } from 'react-icons/fa'

type FormValues = z.infer<typeof createProductSchema>
const Index = () => {
  const { state } = useLocation()

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, [])
  const navigate = useNavigate()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
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

  if (Auth.role.value !== 'admin' && Auth.role.value !== 'manager') {
    return <Navigate to="/dashboard" />
  }
  const onFormSubmitReady = async (data: FormValues) => {
    if (state) {
      editProduct({ data, productId: state.productId })
    } else {
      await createProduct({
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: data.productPrice,
        stock: data.stock,
      })
      orderForm.reset()
    }
  }
  return (
    <div className="w-full poppins-regular">
      <div className="mx-auto p-10 max-w-6xl">
        <div className="flex gap-2 items-center mb-10">
          <Button onClick={() => navigate(-1)} className="bg-light-gray shadow-none text-black">
            <FaArrowLeft />
          </Button>
          <h1 className="text-xl font-medium">Add product</h1>
        </div>

        <Form {...orderForm}>
          <form
            className="p-2 rounded-2xl bg-white shadow-xl mx-auto md:p-4 lg:p-8"
            action=""
            onSubmit={orderForm.handleSubmit(onFormSubmitReady)}
          >
            <div className="flex flex-col md:flex-row mb-4 gap-4">
              <FormField
                control={orderForm.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="mb-2">Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription>Product name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  <FormItem className="mb-4 w-full md:w-1/2">
                    <FormLabel>Product stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5000"
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>Product description.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormItem className="mb-4 w-full">
                <FormLabel>Product image</FormLabel>
                <FormControl>
                  <div {...getRootProps()} className="relative  bg-light-gray rounded-xl max-w-6xl h-52">
                    <input
                      {...getInputProps()}
                      className="w-full cursor-pointer flex items-center justify-center bg-light-gray rounded-xl h-40"
                    />
                    <div className="absolute top-1/4 left-1/4 flex flex-col items-center gap-2">
                      <MdAddAPhoto className="text-3xl" />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Drag and drop some files here, or click to select files</p>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Product image.</FormDescription>
                <FormMessage />
              </FormItem>
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
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Index

Index.getLayout = getHeaderLayout
