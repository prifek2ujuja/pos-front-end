import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <RouterProvider router={createRouter()} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
