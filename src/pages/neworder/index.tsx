import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { createOrderSchema } from 'src/schemas/index'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import useListProducts from 'src/hooks/queries/useListProducts'
import { useHookstate } from '@hookstate/core'
import { OrderItem, Product } from 'src/types'
import { MdMobileScreenShare, MdOutlinePhoneEnabled } from 'react-icons/md'
import { useEffect, useState } from 'react'
import useCreateOrder from 'src/hooks/mutations/useCreateOrder'
import { PropagateLoader } from 'react-spinners'
import { useLocation, useNavigate } from 'react-router-dom'
import useEditOrder from 'src/hooks/mutations/useEditOrder'
import { getHeaderLayout } from 'src/components/layout'
import { FaArrowLeft } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { BsCashStack } from 'react-icons/bs'
import { IoSearchSharp } from 'react-icons/io5'
import ProductCard from './components/ProductCard'
import OrderItemsSummary from './components/OrderItemsSummary'

type FormValues = z.infer<typeof createOrderSchema>
const Index = () => {
  const [orderItemsError, setOrderItemsError] = useState<string>()
  const { data: products } = useListProducts()
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const { state } = useLocation()
  const navigate = useNavigate()
  const [paymentMode, setPaymentMode] = useState<string>(() => {
    if (state) {
      return state.paymentMode
    } else {
      return 'cash'
    }
  })
  const { mutateAsync: createOrder, isLoading: createOrderIsLoading } = useCreateOrder()
  const { mutateAsync: editOrder } = useEditOrder()

  const orderForm = useForm<FormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      paymentMode: state ? state.paymentMode : 'cash',
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
    if (orderItems.value.length === 0) {
      setOrderItemsError('Please add products to the order')
      return
    }
    if (data.paymentMode === 'mpesa' && !data.refCode) {
      orderForm.setError('refCode', { message: 'Transaction code is required' })
      return
    }
    // const parsedPhone = parsePhoneNumber(data.customerPhone, 'KE')
    // if (!parsedPhone || !parsedPhone.isValid()) {
    //   orderForm.setError('customerPhone', { message: 'Invalid phone number' })
    //   return
    // }
    if (state) {
      await editOrder({
        orderId: state.orderId,
        data: {
          // @ts-ignore
          orderItems: orderItems.value.map((val) => ({ product: val.product, quantity: val.quantity })),
          orderTotal: orderItems.value.reduce((acc, currentValue) => acc + parseInt(currentValue.product.price), 0),
          paymentMode: data.paymentMode,
          refCode: data.refCode || '',
          customer: {
            name: data.customerName,
            phone: data.customerPhone || '',
          },
        },
      })
    } else {
      await createOrder({
        // @ts-ignore
        orderItems: orderItems.value.map((val) => ({ product: val.product, quantity: val.quantity })),
        orderTotal: orderItems.value.reduce((acc, currentValue) => acc + parseInt(currentValue.product.price), 0),
        paymentMode: data.paymentMode,
        refCode: data.refCode || '',
        customer: {
          name: data.customerName,
          phone: data.customerPhone || '',
        },
      })
    }

    orderForm.reset()
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
          <h1 className="text-lg font-medium">New sale</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-7">
          <div className="flex flex-col gap-3 lg:gap-6 lg:col-span-2">
            <div className="sticky top-5 z-50">
              <div className="relative bg-white rounded-2xl p-2 flex items-center shadow-lg mb-7">
                <input
                  placeholder="Search product name"
                  className="w-full focus:border-none rounded-2xl p-1 focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value) {
                      const results = products?.filter((prod) => prod.name.includes(e.target.value))
                      if (results) setSearchResults(results)
                    } else {
                      setSearchResults([])
                    }
                  }}
                />
                <IoSearchSharp className="absolute right-3 text-sky" />
              </div>
            </div>

            <div className="flex flex-col gap-3 p-2 md:p-4 min-h-fit h-full">
              {orderItemsError && <p className="text-red-500 text-sm my-2 font-medium">{orderItemsError}</p>}
              {searchResults.length > 0 ? (
                <div className="h-full grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 justify-center">
                  {searchResults?.map((product: Product) => {
                    const selected = orderItems.value.find((item) => item.product._id === product._id)
                    return (
                      <ProductCard
                        addToCart={addToCart}
                        product={product}
                        selected={selected}
                        key={crypto.randomUUID()}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="h-full grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 justify-center">
                  {products?.map((product) => {
                    const selected = orderItems.value.find((item) => item.product._id === product._id)
                    return (
                      <ProductCard
                        addToCart={addToCart}
                        product={product}
                        selected={selected}
                        key={crypto.randomUUID()}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <Form {...orderForm}>
            <form
              action=""
              onSubmit={orderForm.handleSubmit(onFormReadySubmit)}
              className="p-3 relative md:sticky md:top-5 rounded-2xl bg-white shadow-xl md:p-4 h-fit"
            >
              <div className="flex flex-col gap-3 my-3">
                <FormField
                  control={orderForm.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem className="w-full flex gap-3">
                      <FormControl>
                        <div className="w-full relative mb-4 bg-card  rounded-2xl flex items-center shadow-2xl">
                          <Input
                            placeholder="Customer name"
                            {...field}
                            className="w-full focus:border-none rounded-2xl p-2 h-14 border   bg-light-gray focus:outline-none"
                          />
                          <FaCircleUser className="absolute right-3 text-sky" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={orderForm.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem className="gap-3 w-full focus:outline-sky ">
                      <FormControl>
                        <div className="w-full relative mb-4 bg-card rounded-2xl flex items-center shadow-lg">
                          <Input
                            placeholder="Customer phone number"
                            {...field}
                            className="w-full focus:border-none rounded-2xl p-2 h-14 border  bg-light-gray focus:outline-none"
                          />
                          <MdOutlinePhoneEnabled className="absolute right-3 text-sky" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  */}
              <div>
                <div className="flex items-center rounded-3xl h-14 justify-evenly bg-light-gray mt-4 mb-4 shadow-lg">
                  <button
                    onClick={() => {
                      setPaymentMode('mpesa')
                      orderForm.setValue('paymentMode', 'mpesa')
                    }}
                    type="button"
                    className={`flex items-center justify-center h-full gap-2 rounded-3xl p-1 w-1/2 ${
                      paymentMode === 'mpesa' ? 'bg-sky text-white' : ''
                    }`}
                  >
                    <MdMobileScreenShare />
                    <p>M-Pesa</p>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMode('cash')
                      orderForm.setValue('paymentMode', 'cash')
                    }}
                    type="button"
                    className={`flex items-center justify-center h-full gap-2 rounded-3xl p-1 w-1/2 ${
                      paymentMode === 'cash' ? 'bg-sky text-white' : ''
                    }`}
                  >
                    <BsCashStack />
                    <p>Cash</p>
                  </button>
                </div>
                {orderForm.formState.errors.paymentMode && (
                  <div className="my-2">
                    <p className="text-red-500 font-medium text-sm">{orderForm.formState.errors.paymentMode.message}</p>
                  </div>
                )}
                {paymentMode === 'mpesa' && (
                  <FormField
                    control={orderForm.control}
                    name="refCode"
                    render={({ field }) => (
                      <FormItem className="mb-8 w-full">
                        {/* <FormLabel className="mb-2">Transaction code</FormLabel> */}
                        <FormControl>
                          <Input
                            className="focus:border-none h-14 p-2 bg-light-gray shadow-lg rounded-2xl"
                            placeholder="Transaction code"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <OrderItemsSummary orderItems={orderItems} removeFromCart={removeFromCart} />
              <div className="flex flex-col gap-3 items-center">
                {createOrderIsLoading && (
                  <div className="flex items-center justify-center w-full">
                    <PropagateLoader className="bg-sky" color="#4e97fd" />
                  </div>
                )}
                <div className="flex w-full gap-4 p-2  bottom-0 left-0">
                  {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
                  <Button
                    onClick={() => {
                      orderItems.set([])
                      orderForm.reset()
                    }}
                    className=" w-1/2 rounded-2xl bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Clear order
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 rounded-2xl bg-sky"
                    disabled={createOrderIsLoading || (!orderForm.formState.isDirty && orderItems.value.length === 0)}
                  >
                    Save order
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Index
Index.getLayout = getHeaderLayout
