import { ColumnDef } from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from 'src/components/ui/button'
import EditUserModal from 'src/pages/users/components/EditUserModal'
import { AdminUserData } from 'src/types'
import useDecodeToken from '../useDecodeToken'

const useUsersTable = () => {
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  const tableColumns: ColumnDef<AdminUserData>[] = [
    {
      accessorKey: 'avatar',
      header: () => <p></p>,
      cell: ({ row }) => {
        const avatar: string = row.getValue('avatar')
        return <img src={avatar} alt="product-image" className="h-10 w-10 rounded-full" />
      },
    },
    {
      accessorKey: 'userName',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">User name</p>,
      cell: ({ row }) => {
        const userName: string = row.getValue('userName')
        return <p className="text-sm">{userName}</p>
      },
    },
    {
      accessorKey: 'phoneNumber',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Product</p>,
      cell: ({ row }) => {
        const phoneNumber: string = row.getValue('phoneNumber')
        return <p className="text-sm">{phoneNumber}</p>
      },
    },
    {
      accessorKey: 'email',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Email</p>,
      cell: ({ row }) => {
        const email: string = row.getValue('email')
        return <p className="text-sm">{email}</p>
      },
    },
    {
      accessorKey: 'role',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Role</p>,
      cell: ({ row }) => {
        const userRole: string = row.getValue('role')
        return <p className="text-sm">{userRole}</p>
      },
    },
    {
      accessorKey: 'status',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Status</p>,
      cell: ({ row }) => {
        const status: string = row.getValue('status')
        return <p className="text-sm">{status}</p>
      },
    },

    {
      accessorKey: '_id',
      header: () => <p className="text-sm md:text-base text-primary font-semibold">Action</p>,
      cell: ({ row }) => {
        const id: string = row.getValue('_id')
        const userRole: string = row.getValue('role')
        const userName: string = row.getValue('userName')
        const status: string = row.getValue('status')
        return (
          <div>
            {role === 'admin' ? (
              <>
                <EditUserModal userName={userName} role={userRole} status={status} id={id} />
                <Button
                  //   onClick={() => deleteProduct({ productId })}
                  className="bg-white text-destructive border-none shadow-none hover:bg-light-gray"
                >
                  <AiOutlineDelete />
                </Button>
              </>
            ) : role === 'manager' ? (
              <EditUserModal userName={userName} role={userRole} status={status} id={id} />
            ) : null}
          </div>
        )
      },
    },
  ]
  return tableColumns
}

export default useUsersTable
