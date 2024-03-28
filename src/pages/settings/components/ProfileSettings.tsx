import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { accountSettingsSchema } from 'src/schemas'
import useUserProfile from 'src/hooks/queries/useUserProfile'
import Auth from 'src/state/Auth'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { PropagateLoader } from 'react-spinners'
import useEditUser from 'src/hooks/mutations/useEditUser'

type FormValues = z.infer<typeof accountSettingsSchema>
const ProfileSettings = () => {
  const { data: profile } = useUserProfile(Auth.id.value as string)

  const editAccountForm = useForm<FormValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      userName: profile?.userName,
      phoneNumber: profile?.phoneNumber,
    },
  })
  const { mutateAsync: editUser, isLoading: editUserIsLoading } = useEditUser()
  const onFormSubmitReady = async (data: FormValues) => {
    console.log(data)
    await editUser({ id: Auth.id.value as string, editData: data })
  }
  return (
    <Form {...editAccountForm}>
      <form className="w-full max-w-4xl p-4" onSubmit={editAccountForm.handleSubmit(onFormSubmitReady)}>
        <div className="mb-5">
          <h1 className="font-medium">Account settings</h1>
        </div>
        <FormField
          control={editAccountForm.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel className="">Username</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription className="">Change a username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editAccountForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="07819183623" {...field} />
              </FormControl>
              <FormDescription>Change phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-10 flex flex-col md:flex-row gap-4">
          <Button type="submit" className="w-full bg-sky">
            {editUserIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileSettings
