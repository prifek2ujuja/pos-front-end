import { RadioGroup } from '@radix-ui/react-radio-group'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { z } from 'zod'
import { RadioGroupItem } from 'src/components/ui/radio-group'
import { editProductStockSchema } from 'src/schemas'
import useEditProduct from 'src/hooks/mutations/useEditProduct'
import { Popover, PopoverTrigger } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { PopoverContent } from '@radix-ui/react-popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaEdit } from 'react-icons/fa'
import { PropagateLoader } from 'react-spinners'

type FormValues = z.infer<typeof editProductStockSchema>

type Props = {
  productId: string
  stock: number
  productName: string
}

const EditStock = ({ productId, stock, productName }: Props) => {
  const editStockForm = useForm<FormValues>({
    resolver: zodResolver(editProductStockSchema),
  })
  const { mutateAsync: editProduct, isLoading: editProductIsLoading } = useEditProduct()
  const onFormSubmitReady = async (data: FormValues) => {
    console.log('handle submit called')
    // pass
    const finalStock = data.action === 'add' ? stock + data.stock : stock - data.stock
    if (finalStock < 0) {
      editStockForm.setError('stock', {
        message: 'Action not allowed. This will result to a negative stock value.',
      })
      return
    }
    const payload = {
      stock: finalStock,
    }
    await editProduct({ data: payload, productId })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-none text-sky shadow-none">
          <FaEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...editStockForm}>
          <form
            className="p-2 rounded-2xl bg-white shadow-xl md:p-4"
            action=""
            onSubmit={editStockForm.handleSubmit(onFormSubmitReady)}
          >
            <div className="mb-3">
              <h1 className="text-lg font-medium">Edit {productName} stock</h1>
            </div>
            <FormField
              control={editStockForm.control}
              name="action"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Select an action</FormLabel>
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
                    />
                  </FormControl>
                  <FormDescription>The amount of sock to remove or add.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="m2-10">
              {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
              <Button
                disabled={editProductIsLoading || !editStockForm.formState.isDirty}
                type="submit"
                className="w-full bg-sky flex items-center"
              >
                {editProductIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save'}
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
      </PopoverContent>
    </Popover>
  )
}

export default EditStock