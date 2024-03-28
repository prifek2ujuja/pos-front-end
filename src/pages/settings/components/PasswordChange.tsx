import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { passwordChangeSchema } from 'src/schemas'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import useEditPassword from 'src/hooks/mutations/useEditPassword'
import Auth from 'src/state/Auth'
import { PropagateLoader } from 'react-spinners'

type FormValues = z.infer<typeof passwordChangeSchema>
const PasswordChange = () => {
  const editAccountForm = useForm<FormValues>({
    resolver: zodResolver(passwordChangeSchema),
  })
  const { mutateAsync: editPassword, isLoading: editPasswordIsLoading } = useEditPassword()
  const onFormReadySubmit = async (data: FormValues) => {
    await editPassword({ id: Auth.id.value as string, editData: data })
  }
  return (
    <Form {...editAccountForm}>
      <form className="w-full max-w-4xl p-4" onSubmit={editAccountForm.handleSubmit(onFormReadySubmit)}>
        <div className="mb-5">
          <h1 className="font-medium">Password settings</h1>
        </div>
        <FormField
          control={editAccountForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
              <FormDescription>Enter a password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editAccountForm.control}
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

        <div className="my-10 flex flex-col md:flex-row gap-4">
          <Button type="submit" className="w-full bg-sky">
            {editPasswordIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Change password'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PasswordChange
