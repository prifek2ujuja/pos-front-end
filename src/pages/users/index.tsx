import { Link, Navigate } from 'react-router-dom'
import useListUsers from 'src/hooks/queries/useListUsers'
import useUsersTable from 'src/hooks/tableColumns/useUsersTable'
import DataTable from '../dashboard/components/DataTable'
import { Button } from 'src/components/ui/button'
import { PacmanLoader } from 'react-spinners'
import Auth from 'src/state/Auth'

const Users = () => {
  const tableColumns = useUsersTable()
  const { data: users, isLoading: usersIsLoading } = useListUsers()

  if (Auth.role.value !== 'admin' && Auth.role.value !== 'manager') {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="p-2 bg-white rounded-2xl w-full">
      <div className="flex justify-between items-center">
        <h1 className="my-5 font-medium">User accounts</h1>
        <Link to="/signup">
          <Button className="bg-sky text-sm">New user</Button>
        </Link>
      </div>
      {usersIsLoading ? (
        <div className="flex items-center justify-between h-40 w-full">
          <PacmanLoader color="blue" />
        </div>
      ) : (
        <DataTable
          columns={tableColumns}
          data={users}
          isSearchable={true}
          searchField="userName"
          searchFieldPlaceholder="Filter user"
        />
      )}
    </div>
  )
}

export default Users
