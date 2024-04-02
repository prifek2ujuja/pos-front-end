import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { loginSchema } from 'src/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import useLogin from 'src/hooks/mutations/useLogin'
import { PropagateLoader } from 'react-spinners'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'

type FormValues = z.infer<typeof loginSchema>

const SignInForm = () => {
  const loginForm = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: login, isLoading: loginIsLoading } = useLogin()

  const onFormReadySubmit = async (data: FormValues) => {
    await login({
      email: data.email,
      password: data.password,
    })
    // loginForm.reset()
  }
  return (
    <div className="w-full">
      <Form {...loginForm}>
        <form action="" onSubmit={loginForm.handleSubmit(onFormReadySubmit)} className="mx-auto w-full max-w-4xl p-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4 w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="working@email.com" {...field} className="w-full" />
                </FormControl>
                <FormDescription>Your working email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4 w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field} type="password" />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-10 flex flex-col  items-center  gap-6">
            {loginIsLoading && <PropagateLoader color="#4E97FD" />}
            <Button type="submit" className="w-full bg-sky flex items-center " disabled={loginIsLoading}>
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
