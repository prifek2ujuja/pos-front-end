import dayjs from 'dayjs'
import { RiFileDownloadFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import { Button } from 'src/components/ui/button'
import useListDailyReports from 'src/hooks/queries/useListDailyReports'
import { DailyReport } from 'src/types'

const DailyReports = () => {
  const { data: reports, isLoading, isSuccess } = useListDailyReports()
  const navigate = useNavigate()
  return (
    <div className="rounded-2xl p-2 bg-white shadow-xl w-full">
      <h1 className="my-5 font-medium">Daily reports</h1>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <PacmanLoader color="#4E97FD" />
        </div>
      ) : isSuccess ? (
        <div>
          {reports.map((report: DailyReport) => (
            <div key={crypto.randomUUID()} className="flex justify-between items-center">
              <Button
                onClick={() => navigate(`/report/${report.createdAt}`)}
                className="bg-light-gray text-primary hover:bg-light-gray shadow-none p-0 hover:text-sky hover:underline"
              >
                <p>{dayjs(report.createdAt).format('ddd D MMM YYYY')} </p>
              </Button>

              <Button className="bg-light-gray text-sky hover:text-primary font-medium shadow-none hover:bg-light-gray">
                <RiFileDownloadFill size={21} />
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
          <p>No reports for now</p>
        </div>
      )}
    </div>
  )
}

export default DailyReports
