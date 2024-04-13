import React from 'react'
import useSalesLeaderboard from 'src/hooks/queries/useSalesLeaderboard'

const SalesLeaderboard = () => {
  const { data } = useSalesLeaderboard()
  console.log(data)
  return (
    <div className="rounded-2xl p-2 bg-white shadow-xl w-full lg:p-4">
      <div className="flex justify-between w-full items-center  mb-3">
        <h1 className="font-medium">Sales leaderboard</h1>
        {/* <Link to="#" className="text-sky hover:underline flex items-center gap-2 text-sm">
          <p>View all</p>
          <IoIosArrowRoundForward />
        </Link> */}
      </div>
    </div>
  )
}

export default SalesLeaderboard
