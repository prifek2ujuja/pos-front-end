import * as z from 'zod'

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/

export const createOrderSchema = z.object({
  customerName: z.string().min(2).max(15).optional(),
  customerPhone: z.string().min(2).max(15).optional(),
  paymentMode: z.string(),
  refCode: z.string().optional(),
})

export const createProductSchema = z.object({
  productName: z.string().min(2).max(30),
  productPrice: z.number(),
  productDescription: z.string().min(10).max(30),
  stock: z.number(),
})

export const signupSchema = z
  .object({
    userName: z.string().min(2).max(30),
    email: z.string().min(1, 'Email is required').email({
      message: 'Must be a valid email',
    }),
    phoneNumber: z.string().min(9).max(13),
    role: z.string().min(1).max(13),
    status: z.string().min(1).max(13),
    password: z
      .string()
      .regex(
        passwordRegex,
        'Password must have at least 8 characters with at least one capital letter and one number.',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const editProductStockSchema = z.object({
  stock: z.number().min(1),
  action: z.string(),
})

export const editUserSchema = z.object({
  role: z.string().min(1, { message: 'Role is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
})

export const accountSettingsSchema = z.object({
  userName: z.string().min(2).max(30),
  phoneNumber: z.string().min(9).max(13),
})

export const passwordChangeSchema = z.object({
  password: z
    .string()
    .regex(passwordRegex, 'Password must have at least 8 characters with at least one capital letter and one number.'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
})
