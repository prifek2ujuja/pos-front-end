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
import { TbShoppingCartMinus } from 'react-icons/tb'

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
          <Button
            onClick={() => navigate(-1)}
            className="bg-light-gray shadow-none text-black hover:bg-light-gray hover:text-sky"
          >
            <FaArrowLeft />
          </Button>
          <h1 className="text-lg font-medium">New sale</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="flex flex-col gap-3 lg:col-span-2 bg-white rounded-2xl shadow-xl p-2 md:p-4 min-h-fit h-full">
            <div className="relative mb-4 bg-card rounded-md flex items-center shadow-lg">
              <input
                placeholder="Search product name"
                className="w-full focus:border-none rounded-md p-1 border bg-light-gray focus:outline-none"
              />
              <IoSearchSharp className="absolute right-3 text-sky" />
            </div>
            <div className="h-full grid grid-cols-2 md:flex md:flex-row flex-wrap gap-3">
              {products?.map((product) => {
                const selected = orderItems.value.find((item) => item.product._id === product._id)
                return (
                  <Button
                    type="button"
                    key={crypto.randomUUID()}
                    className={`relative flex flex-col p-0 text-black hover:text-white w-full md:w-32 rounded-lg  ${
                      selected ? ' border-1 border-sky shadow-xl' : ' border-2 shadow-lg'
                    } h-fit  bg-light-gray cursor-pointer`}
                    onClick={() => addToCart(product)}
                  >
                    <img
                      src={product.productImage}
                      alt="product-image"
                      className="w-full md:w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between items-center text-sm my-2">
                      <p className="font-medium flex items-center gap-1 text-sm md:text-md">
                        {product.name}{' '}
                        {selected && (
                          <div className="bg-sky rounded-full h-4 w-4 text-xs text-white">{selected.quantity}</div>
                        )}
                      </p>
                      <p className="text-sky font-medium text-sm md:text-md">ksh {product.price}</p>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          <Form {...orderForm}>
            <form
              action=""
              onSubmit={orderForm.handleSubmit(onFormReadySubmit)}
              className="p-2 relative rounded-2xl bg-white shadow-xl md:p-4 h-full"
            >
              <div className="flex flex-col gap-3 mb-3">
                <div className="flex flex-col ">
                  <FormField
                    control={orderForm.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center gap-3">
                        <FormControl>
                          <div className="  w-full relative mb-4 bg-card  rounded-md flex items-center shadow-lg">
                            <Input
                              placeholder="Customer name"
                              {...field}
                              className="w-full focus:border-none rounded-md p-1  bg-light-gray focus:outline-none"
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
                      <FormItem className="flex items-center gap-3 w-full focus:outline-sky flex-row-reverse">
                        <FormControl>
                          <div className="w-full relative mb-4 bg-card rounded-md flex items-center shadow-lg">
                            <Input
                              placeholder="Customer phone number"
                              {...field}
                              className="w-full focus:border-none rounded-md p-1 bg-light-gray focus:outline-none"
                            />
                            <MdOutlinePhoneEnabled className="absolute right-3 text-sky" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/*  */}
              <div>
                <div className="flex items-center rounded-3xl justify-evenly bg-light-gray mt-4 mb-6 shadow-lg">
                  <button
                    onClick={() => {
                      setPaymentMode('mpesa')
                      orderForm.setValue('paymentMode', 'mpesa')
                    }}
                    type="button"
                    className={`flex items-center justify-center gap-2 rounded-3xl p-1 w-1/2 ${
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
                    className={`flex items-center justify-center gap-2 rounded-3xl p-1 w-1/2 ${
                      paymentMode === 'cash' ? 'bg-sky text-white' : ''
                    }`}
                  >
                    <BsCashStack />
                    <p>Cash</p>
                  </button>
                </div>
                {paymentMode === 'mpesa' && (
                  <FormField
                    control={orderForm.control}
                    name="refCode"
                    render={({ field }) => (
                      <FormItem className="mb-8 w-full">
                        {/* <FormLabel className="mb-2">Transaction code</FormLabel> */}
                        <FormControl>
                          <Input
                            className="focus:border-none bg-light-gray shadow-lg"
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
              <div className="mb-10 h-72 cursor-pointer">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-medium text-sm">Product</th>
                      <th className="text-left font-medium text-sm">Price</th>
                      <th className="text-left font-medium text-sm">Quantity</th>
                      <th className="text-left font-medium text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {orderItems.value.map((item) => (
                      <tr key={item.product._id}>
                        <td className="text-sm">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.productImage}
                              className="h-5 w-5 rounded-full hidden md:block"
                              alt="product-image"
                            />
                            <p>{item.product.name}</p>
                          </div>
                        </td>
                        <td className="text-sm">{item.product.price}</td>
                        <td className="text-sm text-center">{item.quantity}</td>
                        <td className="text-sm">{parseInt(item.product.price) * item.quantity}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 rounded-lg p-3 hover:bg-sky hover:text-white"
                          >
                            <TbShoppingCartMinus />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex w-full flex-col md:flex-row gap-4 p-2 absolute bottom-0 left-0">
                {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
                <Button type="submit" className="w-1/2 bg-sky" disabled={createOrderIsLoading}>
                  {createOrderIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save order'}
                </Button>
                <Button className=" w-1/2 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Clear order
                </Button>
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
