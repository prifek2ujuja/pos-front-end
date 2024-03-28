import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { editUserSchema } from 'src/schemas'
import { PropagateLoader } from 'react-spinners'
import useEditUser from 'src/hooks/mutations/useEditUser'

type FormValues = z.infer<typeof editUserSchema>

type Props = { role: string; status: string; userName: string; id: string }
const EditUserModal = ({ role, status, userName, id }: Props) => {
  const editUserForm = useForm<FormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      role: role,
      status: status,
    },
  })

  const { mutateAsync: editUser, isLoading: editUserIsLoading } = useEditUser()
  const onFormSubmitReady = async (data: FormValues) => {
    console.log(data)
    await editUser({ id, editData: data })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-none text-sky shadow-none">
          <FaEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl shadow-xl bg-white">
        <Form {...editUserForm}>
          <form
            className="p-2  lg:p-4 poppins-regular"
            action=""
            onSubmit={editUserForm.handleSubmit(onFormSubmitReady)}
          >
            <div className="mb-3">
              <h1 className="text-lg font-medium">Edit {userName}</h1>
            </div>
            <FormField
              control={editUserForm.control}
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
                        <SelectValue placeholder={role} />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-black">
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="sales">sales</SelectItem>
                        <SelectItem value="manager">manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserForm.control}
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
                        <SelectValue placeholder={status} />
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
            <div className="m2-10">
              {/* <h1 className="text-gray font-medium mb-4">Payment</h1> */}
              <Button
                disabled={editUserIsLoading || !editUserForm.formState.isDirty}
                type="submit"
                className="w-full bg-sky flex items-center"
              >
                {editUserIsLoading ? <PropagateLoader color="#36d7b7" /> : 'Save'}
              </Button>
              {/* <Button
                type="button"
                className="w-full bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </Button> */}
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}

export default EditUserModal
