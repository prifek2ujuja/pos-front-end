import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { createOrderSchema } from 'src/schemas/index'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { IoIosAdd } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import useListProducts from 'src/hooks/queries/useListProducts'
import { useHookstate } from '@hookstate/core'
import { OrderItem, Product } from 'src/types'
import { FaMinus } from 'react-icons/fa6'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import { useEffect, useState } from 'react'
import useCreateOrder from 'src/hooks/mutations/useCreateOrder'
import { PropagateLoader } from 'react-spinners'
import { useLocation, useNavigate } from 'react-router-dom'
import useEditOrder from 'src/hooks/mutations/useEditOrder'
import { getHeaderLayout } from 'src/components/layout'
import { FaArrowLeft } from 'react-icons/fa'

type FormValues = z.infer<typeof createOrderSchema>
const Index = () => {
  const { data: products, isSuccess: productsIsSuccess } = useListProducts()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [paymentMode, setPaymentMode] = useState<string>(() => {
    if (state) {
      return state.paymentMode
    } else {
      return undefined
    }
  })
  const { mutateAsync: createOrder, isLoading: createOrderIsLoading } = useCreateOrder()
  const { mutateAsync: editOrder, isLoading: editOrderIsLoading } = useEditOrder()

  const orderForm = useForm<FormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      paymentMode: state ? state.paymentMode : undefined,
      refCode: state ? state.refCode : undefined,
    },
  })
  const orderItems = useHookstate<OrderItem[]>([])

  useEffect(() => {
    if (state) {
      orderItems.set(state.orderItems)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const addToCart = (product: Product) => {
    const existingProduct = orderItems.value.find((item) => item.product._id === product._id)
    if (existingProduct) {
      const index = orderItems.value.indexOf(existingProduct)
      orderItems[index].set((p) => ({ ...p, quantity: p.quantity + 1 }))
    } else {
      orderItems.set((prev) => [...prev, { product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    const existingProduct = orderItems.value.find((item) => item.product._id === productId)
    if (existingProduct) {
      const index = orderItems.value.indexOf(existingProduct)
      orderItems[index].set((p) => ({ ...p, quantity: p.quantity - 1 }))
      if (orderItems.value[index].quantity <= 0) {
        orderItems.set((p) => p.filter((item) => item.product._id !== productId))
      }
    }
  }

  const onFormReadySubmit = async (data: FormValues) => {
    if (state) {
      await editOrder({
        orderId: state.orderId,
        data: {
          orderItems: orderItems.value.map((val) => ({ product: val.product, quantity: val.quantity })),
          orderTotal: orderItems.value.reduce((acc, currentValue) => acc + parseInt(currentValue.product.price), 0),
          paymentMode: data.paymentMode,
          refCode: data.refCode || '',
          customer: {
            name: data.customerName,
            phone: data.customerPhone,
          },
        },
      })
    } else {
      await createOrder({
        orderItems: orderItems.value.map((val) => ({ product: val.product, quantity: val.quantity })),
        orderTotal: orderItems.value.reduce((acc, currentValue) => acc + parseInt(currentValue.product.price), 0),
        paymentMode: data.paymentMode,
        refCode: data.refCode || '',
        customer: {
          name: data.customerName,
          phone: data.customerPhone,
        },
      })
    }

    orderForm.reset()
  }
  return (
    <div className="w-full poppins-regular">
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-2 items-center mb-10">
          <Button onClick={() => navigate(-1)} className="bg-light-gray shadow-none text-black">
            <FaArrowLeft />
          </Button>
          <h1 className="text-xl font-medium">New sale</h1>
        </div>
        <Form {...orderForm}>
          <form
            action=""
            onSubmit={orderForm.handleSubmit(onFormReadySubmit)}
            className="p-2 rounded-2xl bg-white shadow-xl md:p-4 lg-p-8"
          >
            <h1 className="font-medium mb-2">Customer information (optional)</h1>
            <div className="flex flex-col md:flex-row mb-4 gap-4">
              <FormField
                control={orderForm.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="mb-2">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription>Customers name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orderForm.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full focus:outline-sky">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="07819183623"
                        {...field}
                        className="placeholder:text-gray    focus:outline-none"
                      />
                    </FormControl>
                    <FormDescription>Customers phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <h1 className="mb-2 text-black font-medium">Order items</h1>
              {/* Product list */}
              <div className="flex flex-col">
                <FormLabel className="mb-2">Select items</FormLabel>
                <Select
                  onValueChange={(val) => {
                    addToCart(JSON.parse(val))
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productsIsSuccess &&
                      products.map((product) => (
                        <SelectItem key={crypto.randomUUID()} value={JSON.stringify(product)}>
                          <div className="flex gap-2">
                            <img
                              src={product.productImage}
                              alt={`${product.name}-image`}
                              className="h-8 w-8 rounded-full"
                            />
                            <p>{product.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="mt-10 mb-4 flex flex-col gap-3 rounded-2xl p-2 min-h-20">
                  {orderItems.value.length === 0 && (
                    <div className="flex justify-center items-center min-h-20">
                      <p>No products selected</p>
                    </div>
                  )}
                  {orderItems.value.map((item) => (
                    <div key={crypto.randomUUID()} className="flex items-center justify-between">
                      <div className="flex gap-2 md:gap-4 items-center">
                        <img src={item.product.productImage} alt="product-image" className="w-10 h-10 rounded-full" />
                        <p>{item.product.name}</p>
                      </div>
                      <div className="flex items-center gap-3 md:gap-6">
                        <Button
                          onClick={() => addToCart(item.product)}
                          type="button"
                          className="rounded-full w-10 p-0  h-10 bg-sky border border-sky"
                        >
                          <IoIosAdd className="text-2xl" />
                        </Button>
                        <p className="text-gray font-bold">{item.quantity}</p>
                        <Button
                          onClick={() => removeFromCart(item.product._id)}
                          type="button"
                          className="rounded-full w-10 p-0  h-10 bg-sky border border-sky"
                        >
                          <FaMinus className="text-xl" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <FormField
                control={orderForm.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem className="space-x-3">
                    <FormLabel>Mode of payment</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(val: any) => {
                          setPaymentMode(val)
                          field.onChange(val)
                        }}
                        defaultValue={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem className="text-sky border-sky" value="mpesa" />
                          </FormControl>
                          <FormLabel className="font-normal">M-pesa</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem className="text-sky border-sky" value="cash" />
                          </FormControl>
                          <FormLabel className="font-normal">Cash</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {paymentMode === 'mpesa' && (
                <FormField
                  control={orderForm.control}
                  name="refCode"
                  render={({ field }) => (
                    <FormItem className="my-4 w-full">
                      <FormLabel className="mb-2">Transaction code</FormLabel>
                      <FormControl>
                        <Input placeholder="SFCFRGLSFC" {...field} />
                      </FormControl>
                      <FormDescription>Ref code.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-4">
              {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
              <Button type="submit" className="w-full bg-sky" disabled={createOrderIsLoading}>
                {createOrderIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save order'}
              </Button>
              <Button className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Clear order
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
