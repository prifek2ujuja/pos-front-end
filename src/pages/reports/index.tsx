import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingCard } from 'src/components/loading'
import { Button } from 'src/components/ui/button'
import useListDailyReports from 'src/hooks/queries/useListDailyReports'
import { DailyReport } from 'src/types'

const Reports = () => {
  const { data: reports, isLoading, isSuccess } = useListDailyReports()
  const navigate = useNavigate()
  return (
    <div className="rounded-2xl p-2 lg:p-4 w-full">
      <div className="flex justify-between w-full items-center  mb-3">
        <h1 className="font-medium text-sm md:text-base">Daily reports</h1>
      </div>
      {isLoading ? (
        <LoadingCard />
      ) : isSuccess ? (
        <div>
          {reports?.map((report: DailyReport) => (
            <div key={crypto.randomUUID()} className="flex justify-between items-center">
              <Button
                onClick={() =>
                  navigate(`/report/${report._id}`, {
                    state: { report },
                  })
                }
                className="bg-light-gray text-primary hover:bg-light-gray shadow-none p-0 hover:text-sky hover:underline"
              >
                <p>{dayjs(report.createdAt).format('ddd D MMM YYYY')} </p>
              </Button>

              {/* <Button className="bg-white text-sky hover:text-primary font-medium shadow-none hover:bg-white">
                <MdOutlineDownloadForOffline size={21} />
              </Button> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p>Something went wrong. Please try again</p>
        </div>
      )}
      {isSuccess && reports.length === 0 && (
        <div>
          <p className="text-sm">No reports for now</p>
        </div>
      )}
    </div>
  )
}

export default Reports
