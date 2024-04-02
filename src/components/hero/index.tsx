import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export const Hero = () => {
  return (
    <div className="flex bg-light-gray poppins-regular w-full">
      <div className="flex flex-col items-center mx-auto h-full w-full mt-32">
        <h1 className="text-2xl lg:text-4xl font-bold text-center dancing-bold">
          Welcome to Juja wellness gallery pos
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <Link to="/login">
            <Button className="bg-sky text-white">Sign in</Button>
          </Link>

          <Link to="#">
            <Button disabled className="bg-sky text-white">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
