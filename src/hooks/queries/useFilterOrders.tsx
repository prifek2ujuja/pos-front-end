import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FormValues } from 'src/pages/orders/components/FilterOrders'
import { Order } from 'src/types'
import axios from 'src/api/axios'

const useFilterOrders = () => {
  const [enabled, setEnabled] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [refCode, setRefCode] = useState<string | undefined>(undefined)
  const [paymentMode, setPaymentMode] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [queryKey, setQueryKey] = useState<string>('')

  const handleApplyFilter = (data: FormValues) => {
    setRefCode(data.refCode)
    setPaymentMode(data.paymentMode)
    setStatus(data.status)
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setQueryKey(JSON.stringify(data))
    setEnabled(true)
  }

  const handleClearFilter = () => {
    setRefCode(undefined)
    setPaymentMode(undefined)
    setStatus(undefined)
    setStartDate(undefined)
    setEndDate(undefined)
    setQueryKey('')
    setEnabled(false)
  }

  const {
    data: orders,
    isLoading: ordersIsLoading,
    isError,
    isFetched,
  } = useQuery<Order[]>({
    queryFn: async () => {
      let endpoint = 'orders/filter?'
      if (startDate) {
        endpoint += `startDate=${startDate}&`
      }
      if (endDate) {
        endpoint += `endDate=${endDate}&`
      }
      if (refCode) {
        endpoint += `refCode=${refCode}&`
      }
      if (paymentMode) {
        endpoint += `paymentMode=${paymentMode}&`
      }
      if (status) {
        endpoint += `status=${status}&`
      }

      const response = await axios.get(endpoint)
      return response.data
    },
    staleTime: 180000,
    queryKey: ['orders', queryKey],
    enabled,
  })

  return {
    orders,
    ordersIsLoading,
    isError,
    isFetched,
    enabled,
    handleApplyFilter,
    handleClearFilter,
  }
}

export default useFilterOrders
