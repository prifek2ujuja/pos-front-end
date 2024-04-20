import { FaAward } from 'react-icons/fa6'
import { Skeleton } from 'src/components/ui/skeleton'
import useSalesLeaderboard from 'src/hooks/queries/useSalesLeaderboard'

const SalesLeaderboard = () => {
  const { data, isLoading } = useSalesLeaderboard()
  return (
    <div className="rounded-2xl p-2 bg-white shadow-xl w-full lg:p-4">
      <div className="flex flex-col justify-between w-full  mb-3">
        <h1 className="font-medium text-sm md:text-base">Sales leaderboard</h1>

        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-20 h-4" />
            </>
          ) : (
            <div className="flex flex-col gap-2">
              {data?.map((user, index) => (
                <div className="flex items-center justify-between" key={crypto.randomUUID()}>
                  <p className="capitalize text-sm md:text-base">{user.userName}</p>
                  <div className="flex items-center gap-2">
                    <p>{user.orderCount}</p>
                    {index === 0 ? (
                      <FaAward className="text-yellow-500" />
                    ) : index === 1 ? (
                      <FaAward className="text-light-gray" />
                    ) : index === 2 ? (
                      <FaAward className="text-yellow-800" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesLeaderboard
