import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FormItem, FormLabel } from 'src/components/ui/form'
const Index = () => {
  return (
    <div>
      <div>
        <Link to="/settings">
          <FaArrowLeftLong />
        </Link>
        <h1>Account settings</h1>
      </div>
      <div>
        <div>
          <p>Your profile picture</p>
          <div className="h-20 w-20 rounded-2xl border border-dotted">Upload your photo</div>
        </div>
        {/* <Form> */}
        <FormItem>
          <FormLabel>First name</FormLabel>
        </FormItem>
        {/* </Form> */}
      </div>
    </div>
  )
}

export default Index
