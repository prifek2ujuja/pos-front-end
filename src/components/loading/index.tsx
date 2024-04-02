import { PacmanLoader } from 'react-spinners'
import { Card, CardContent, CardHeader } from '../ui/card'

export const LoadingCard = () => {
  return (
    <Card className="border-none">
      <CardHeader className="">
        <p className="font-medium">Loading...</p>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8">
        <PacmanLoader color="#4E97FD" size={21} />
      </CardContent>
    </Card>
  )
}
