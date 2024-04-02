import logo from 'src/assets/logo.jpg'
import SignUpForm from './components/SignUpForm'
import { getNoneLayout } from 'src/components/layout'
import Auth from 'src/state/Auth'

const Index = () => {
  const isAdmin = Auth.role.value === 'admin'
  return (
    <div className="poppins-regular min-h-screen bg-light-gray">
      <div className="max-w-6xl pt-10 mx-auto flex items-center justify-center gap-5 p-2 h-full">
        {/* <div className=""> */}
        {/* <img src={banner} alt="banner" className="hidden md:block w-1/2 h-[700px] object-cover " /> */}
        {/* </div> */}
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-start md:flex-row md:items-center gap-5 mb-10">
            <img src={logo} alt="logo" className="h-10 md:h-16  w-10 md:w-16 rounded-full" />
            {isAdmin ? (
              <h1>Create a new user</h1>
            ) : (
              <h1 className="text-sky font-medium">Welcome to Juja wellness gallery</h1>
            )}
          </div>
          <div>{!isAdmin && <p className=" font-medium">Create an admin account</p>}</div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
Index.getLayout = getNoneLayout
export default Index
