import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import { Button } from 'src/components/ui/button'
import useListDailyReports from 'src/hooks/queries/useListDailyReports'
import { DailyReport } from 'src/types'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import { IoIosArrowRoundForward } from 'react-icons/io'

const DailyReports = () => {
  const { data: reports, isLoading, isSuccess } = useListDailyReports()
  const navigate = useNavigate()
  if (isLoading) {
    return <div>loading ...</div>
  }
  const finalData = reports.length > 5 ? reports.slice(0, 5) : reports
  return (
    <div className="rounded-2xl p-2 lg:p-4 bg-white shadow-xl w-full">
      <div className="flex justify-between w-full items-center  mb-3">
        <h1 className="font-medium text-sm md:text-base">Daily reports</h1>
        <Link to="#" className="text-sky hover:underline hidden md:flex items-center text-sm">
          <p className="text-sm">View all</p>
          <IoIosArrowRoundForward />
        </Link>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <PacmanLoader color="#4E97FD" />
        </div>
      ) : isSuccess ? (
        <div>
          {finalData.map((report: DailyReport) => (
            <div key={crypto.randomUUID()} className="flex justify-between items-center">
              <Button
                onClick={() => navigate(`/report/${report.createdAt}`)}
                className="bg-white text-primary hover:bg-white shadow-none p-0 hover:text-sky hover:underline"
              >
                <p>{dayjs(report.createdAt).format('ddd D MMM YYYY')} </p>
              </Button>

              <Button className="bg-white text-sky hover:text-primary font-medium shadow-none hover:bg-white">
                <MdOutlineDownloadForOffline size={21} />
              </Button>
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

export default DailyReports
