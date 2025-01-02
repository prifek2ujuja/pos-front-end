export type Product = {
  name: string
  price: string
  _id: string
  description: string
  productImage?: string
  productImages?: ProductImage[]
  stock: number
  category: string
  benefits: string[]
  inStore: number
}

export type OrderItem = {
  product: Product
  quantity: number
}

export type Order = {
  _id: string
  paymentMode: string
  orderTotal: number
  orderItems: OrderItem[]
  createdAt: string
  delivery: string
  customerId: string
  salesPerson: User
}

export type NewDashOrder = {
  customerName?: string
  customerPhone?: string
  orderItems: OrderItem[]
}

export type AdminUserData = User & {
  email: string
  phoneNumber: string
  status: string
  role: string | null
}

export type User = {
  userName: string | null
  status: string | null
  avatar: string | null
  refreshToken: string | null
  id: string | null
  orderCount?: number
}

export type Auth = User & {
  authenticated: boolean
  token: string | null
}

export type DailyProductReport = {
  product: string
  openingStock: number
  closingStock: number
  addedStock: number
  sales: number
  createdAt: string
  productInfo: Product[]
}

export type DailyReport = {
  _id: string
  createdAt: string
  productsReport: DailyProductReport[]
}

export type ErrorResponse = {
  message: string
}

export type ProductImage = {
  _id: string
  imageUrl: string
  imagePath: string
}
