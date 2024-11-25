import { RadioGroup } from '@radix-ui/react-radio-group'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { z } from 'zod'
import { RadioGroupItem } from 'src/components/ui/radio-group'
import { addToStoreSchema, editBackOfficeStockSchema } from 'src/schemas'
import { Popover, PopoverTrigger } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { PopoverContent } from '@radix-ui/react-popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaEdit } from 'react-icons/fa'
import { PropagateLoader } from 'react-spinners'
import useEditProductStock from 'src/hooks/mutations/useEditProductStock'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import useAddStoreStock from 'src/hooks/mutations/useAddStoreStock'

type EditBackOfficeFormValues = z.infer<typeof editBackOfficeStockSchema>
type AddToStoreFormValues = z.infer<typeof addToStoreSchema>

type Props = {
  productId: string
  inStoreStock: number
  backOfficeStock: number
  productName: string
}

const Store = ({ productId, inStoreStock, backOfficeStock, productName }: Props) => {
  const [stockState, setStockState] = useState<number>(backOfficeStock)
  const addToStoreForm = useForm<AddToStoreFormValues>({
    resolver: zodResolver(addToStoreSchema),
    defaultValues: {
      amount: 0,
    },
  })

  const { mutateAsync: addToStore, isLoading: addToStoreIsLoading } = useAddStoreStock()

  const amount = addToStoreForm.watch('amount')
  useEffect(() => {
    setStockState(backOfficeStock - (amount || 0))
  }, [amount, backOfficeStock])

  const onFormSubmitReady = async (data: AddToStoreFormValues) => {
    console.log('handle submit called')
    // pass
    await addToStore({ data, productId })
  }
  return (
    <div className="space-y-3 font-medium">
      <p className="font-medium">Move products from back office to store</p>
      <div className="flex flex-row gap-3">
        <p>Available products:</p>
        <p>{stockState}</p>
      </div>
      <div className="flex flex-row gap-3">
        <p>In store:</p>
        <p>{inStoreStock}</p>
      </div>
      <Form {...addToStoreForm}>
        <form action="" onSubmit={addToStoreForm.handleSubmit(onFormSubmitReady)}>
          <FormField
            control={addToStoreForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="mb-4 w-full">
                <FormLabel>Stock amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="21"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="focus:border-none"
                  />
                </FormControl>
                <FormDescription>The amount of sock to add.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-7 flex flex-col justify-between gap-4 items-center">
            {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
            {addToStoreIsLoading && <PropagateLoader color="#4E97FD" />}
            <Button
              disabled={addToStoreIsLoading || !addToStoreForm.formState.isDirty}
              type="submit"
              className="w-full bg-sky flex items-center border-sky"
            >
              Move products
            </Button>
            {/* <Button
                type="button"
                className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </Button> */}
          </div>
        </form>
      </Form>
    </div>
  )
}

const BackOffice = ({ productId, inStoreStock, backOfficeStock, productName }: Props) => {
  const editStockForm = useForm<EditBackOfficeFormValues>({
    resolver: zodResolver(editBackOfficeStockSchema),
  })
  const { mutateAsync: editProduct, isLoading: editProductIsLoading } = useEditProductStock()
  const onFormSubmitReady = async (data: EditBackOfficeFormValues) => {
    console.log('handle submit called')
    // pass
    const finalStock = data.action === 'add' ? backOfficeStock + data.stock : backOfficeStock - data.stock
    if (finalStock < 0) {
      editStockForm.setError('stock', {
        message: 'Action not allowed. This will result to a negative stock value.',
      })
      return
    }
    const payload = {
      stock: data.stock,
      action: data.action,
    }
    await editProduct({ data: payload, productId })
  }
  return (
    <Form {...editStockForm}>
      <form className="space-y-3" action="" onSubmit={editStockForm.handleSubmit(onFormSubmitReady)}>
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium">Back office:</p>
          <p className="text-sm font-medium text-sky">{backOfficeStock}</p>
        </div>
        <FormField
          control={editStockForm.control}
          name="action"
          render={({ field }) => (
            <FormItem className="mb-3 flex flex-col gap-2">
              <FormLabel>Would you like to add or remove stock?</FormLabel>
              <FormControl className="m-0">
                <RadioGroup
                  className="flex space-x-2"
                  {...field}
                  defaultValue={field.value}
                  onValueChange={(val: any) => {
                    field.onChange(val)
                  }}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem className="text-sky border-sky" value="add" />
                    </FormControl>
                    <FormLabel className="font-normal">Add stock</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem className="text-sky border-sky" value="remove" />
                    </FormControl>
                    <FormLabel className="font-normal">Remove stock</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editStockForm.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Stock amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="21"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  className="focus:border-none"
                />
              </FormControl>
              <FormDescription>The amount of sock to remove or add.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-7 flex flex-col justify-between gap-4 items-center">
          {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
          {editProductIsLoading && <PropagateLoader color="#4E97FD" />}
          <Button
            disabled={editProductIsLoading || !editStockForm.formState.isDirty}
            type="submit"
            className="w-full bg-sky flex items-center border-sky"
          >
            Save
          </Button>
          {/* <Button
                type="button"
                className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </Button> */}
        </div>
      </form>
    </Form>
  )
}

const EditStock = ({ productId, inStoreStock, backOfficeStock, productName }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-none text-sky shadow-none">
          <FaEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] md:min-w-[500px] w-full p-3 bg-white shadow-xl rounded-2xl">
        <div className="mb-3">
          <h1 className="text-base font-medium uppercase">{productName} stock</h1>
        </div>
        <Tabs defaultValue="store" className="w-full">
          <TabsList>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="backOffice">Back office</TabsTrigger>
          </TabsList>
          <TabsContent value="store">
            <Store
              productId={productId}
              inStoreStock={inStoreStock}
              backOfficeStock={backOfficeStock}
              productName={productName}
            />
          </TabsContent>
          <TabsContent value="backOffice">
            <BackOffice
              productId={productId}
              inStoreStock={inStoreStock}
              backOfficeStock={backOfficeStock}
              productName={productName}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

export default EditStock
