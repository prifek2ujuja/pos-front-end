import dayjs from 'dayjs'
import { useLocation, useParams } from 'react-router-dom'
import DataTable from '../dashboard/components/DataTable'
import useDailyReportTable from 'src/hooks/tableColumns/useDailyReportTable'
import { Button } from 'src/components/ui/button'
import { BsDownload } from 'react-icons/bs'

const Report = () => {
  const { state } = useLocation()
  const { timestamp } = useParams()
  const tableColumns = useDailyReportTable()
  console.log(state)
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Report for {dayjs(timestamp).format('MM-DD-YYYY')}</h1>
        <Button className="bg-light-gray">
          <BsDownload />
        </Button>
      </div>
      <DataTable columns={tableColumns} data={state.report.productsReport} isSearchable={false} />
    </div>
  )
}

export default Report
