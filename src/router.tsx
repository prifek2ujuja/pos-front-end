import { RouteObject, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/home'
import Dashboard from './pages/dashboard'
import Orders from './pages/orders'
import Products from './pages/products'
import Settings from './pages/settings'
import AccountSettings from './pages/settings/components/AccountSettings'
import NewOrder from './pages/neworder'
import NewProduct from './pages/newproduct'
import Signup from './pages/signup'
import Login from './pages/login'
import Users from './pages/users'
import Report from './pages/report'
import Reports from './pages/reports'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/sales',
    Component: Orders,
  },
  {
    path: '/sell',
    Component: NewOrder,
  },
  {
    path: '/newproduct',
    Component: NewProduct,
  },
  {
    path: '/products',
    Component: Products,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '/account',
    Component: AccountSettings,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/users',
    Component: Users,
  },
  {
    path: '/reports',
    Component: Reports,
  },
  {
    path: '/report/:id',
    Component: Report,
  },
]

// const createBrowserRouter = routerObjects.map((route) => (<Route>))

export function createRouter(): ReturnType<typeof createBrowserRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createBrowserRouter(routeWrappers)
}
