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
import useDecodeToken from 'src/hooks/useDecodeToken'
import { Badge } from 'src/components/ui/badge'
import { IoMdClose } from 'react-icons/io'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'

type FormValues = z.infer<typeof createProductSchema>
const Index = () => {
  const { state } = useLocation()
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  const [imageError, setImageError] = useState<string>()
  const [benefits, setBenefits] = useState<string[]>(state ? state.benefits : [])
  const [benefitInputText, setBenefitInputText] = useState<string>('')
  const [benefitsError, setBenefitsError] = useState<string>()

  const { uploadFile, downloadURL, imagePath, setDownloadUrl } = useUploadImage()
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      // if (acceptedFiles[0].size > 3145728) {
      //   setImageError('File size exceeds limit of 3MB')
      //   return
      // }
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
      category: state ? state.category : '',
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
      category: data.category || 'supplement',
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

      if (benefits.length === 0) {
        setBenefitsError('Please provide the benefits of this product in bullet point format')
        return
      }
      await createProduct({
        productDescription: data.productDescription,
        productName: data.productName,
        productPrice: data.productPrice,
        stock: data.stock,
        imageUrl: downloadURL,
        imagePath,
        benefits,
        category: data.category,
      })
      orderForm.reset()
      setDownloadUrl('')
      setBenefits([])
      setBenefitsError('')
      return
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
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-6 h-full">
                        <MdAddAPhoto size={40} className="text-sky" />
                        <p className="text-center">Drag and drop an image of click to select image</p>
                        {/* {uploadProgress !== 0 && <p className="text-base lg:text-lg text-center">{uploadProgress}%</p>} */}
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
                  name="category"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="poppins-regular">
                          <SelectItem value="therapy">Therapy</SelectItem>
                          <SelectItem value="supplement">Supplement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the product category.</FormDescription>
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
              <div className="flex flex-col w-full">
                <FormItem className="mb-4 w-full">
                  <FormLabel className="mb-2">
                    Benefits {benefits.length > 0 && <span className="text-gray ml-2">Click on badge to remove</span>}
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 my-6">
                    {benefits.map((benefit, index) => (
                      <Badge
                        key={index}
                        onClick={() => setBenefits((prev) => prev.filter((item) => item !== benefit))}
                        className="cursor-pointer px-2 text-sky  border-sky flex items-center"
                        variant="outline"
                      >
                        <p>{benefit}</p>
                        <span className="text-black">
                          <IoMdClose />
                        </span>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a benefit"
                      value={benefitInputText}
                      onChange={(e) => setBenefitInputText(e.target.value)}
                      className="focus:border-none"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (!benefits.includes(benefitInputText) && benefitInputText.length > 1) {
                          setBenefits([...benefits, benefitInputText])
                          setBenefitInputText('')
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <FormDescription>Add a text and they will appear as badges above.</FormDescription>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="flex-col gap-2 items-center">
                <div className="my-10 flex flex-col md:flex-row gap-4">
                  {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
                  <Button
                    disabled={createProductIsLoading || editProductIsLoading || !orderForm.formState.isDirty}
                    type="submit"
                    className="w-full bg-sky flex items-center"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
                {(createProductIsLoading || editProductIsLoading) && (
                  <PropagateLoader className="mb-2 w-full" color="#4E97FD" />
                )}
              </div>
            </div>
          </form>
        </Form>
        {state && <ProductImages productId={state.productId} />}
      </div>
    </div>
  )
}

export default Index

Index.getLayout = getHeaderLayout
