import { Link, Navigate } from 'react-router-dom'
import useListUsers from 'src/hooks/queries/useListUsers'
import useUsersTable from 'src/hooks/tableColumns/useUsersTable'
import DataTable from '../dashboard/components/DataTable'
import { Button } from 'src/components/ui/button'
import Auth from 'src/state/Auth'
import { LoadingCard } from 'src/components/loading'

const Users = () => {
  const tableColumns = useUsersTable()
  const { data: users, isLoading, isError, isFetched } = useListUsers()

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

      {isLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <DataTable
          columns={tableColumns}
          data={users}
          isSearchable={false}
          searchField="_id"
          searchFieldPlaceholder="Filter order"
        />
      ) : null}
    </div>
  )
}

export default Users
