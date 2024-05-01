import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import DataTable from '../dashboard/components/DataTable'
import useDailyReportTable from 'src/hooks/tableColumns/useDailyReportTable'

const Report = () => {
  const { state } = useLocation()
  const tableColumns = useDailyReportTable()
  return (
    <div className="w-full">
      <div className="flex  items-center">
        <h1 className="font-medium text-base md:text-lg mb-6">
          Reports for {dayjs(state.report.createdAt).format('dd DD MMM YYYY')}
        </h1>
      </div>
      <div className="w-full rounded-2xl p-2 bg-white shadow-xl">
        <DataTable columns={tableColumns} data={state.report.productsReport} isSearchable={false} />
      </div>
    </div>
  )
}

export default Report
