import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signupSchema } from 'src/schemas'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { PropagateLoader } from 'react-spinners'
import useSignup from 'src/hooks/mutations/useSignup'
import Auth from 'src/state/Auth'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'

type FormValues = z.infer<typeof signupSchema>

const SignUpForm = () => {
  const isAdmin = Auth.role.value === 'admin'
  const signupForm = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'admin',
      status: 'active',
    },
  })

  const { mutateAsync: signup, isLoading: signupIsLoading } = useSignup()

  const onFormReadySubmit = async (data: FormValues) => {
    await signup({
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      userName: data.userName,
      role: data.role,
      status: data.status,
    })
    // signupForm.reset()
  }
  return (
    <Form {...signupForm}>
      <form className="w-full max-w-4xl p-4" onSubmit={signupForm.handleSubmit(onFormReadySubmit)}>
        <FormField
          control={signupForm.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel className="">Username</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription className="">Create a username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="07819183623" {...field} />
              </FormControl>
              <FormDescription>Your working phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="working@email.com" {...field} />
              </FormControl>
              <FormDescription>Your working email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
              <FormDescription>Enter a password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormDescription>Confirm your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isAdmin && (
          <div>
            <FormField
              control={signupForm.control}
              name="role"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl className="m-0">
                    <Select
                      {...field}
                      onValueChange={(val: any) => {
                        field.onChange(val)
                      }}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-black">
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="manager">manager</SelectItem>
                        <SelectItem value="sales">sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(val: any) => {
                        field.onChange(val)
                      }}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-black">
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="inactive">inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Deactivate or activate a user account</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="my-10 flex flex-col md:flex-row gap-4">
          <Button type="submit" className="w-full bg-sky" disabled={signupIsLoading}>
            {signupIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Sign up'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm
