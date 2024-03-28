import logo from 'src/assets/logo.jpg'
import { getNoneLayout } from 'src/components/layout'
import SignInForm from './components/SignInForm'

const Index = () => {
  return (
    <div className="poppins-regular bg-light-gray min-h-screen">
      <div className="max-w-6xl pt-10 mx-auto flex items-center justify-center gap-5 p-2 max-h-[800px] h-full">
        {/* <div className=""> */}
        {/* <img src={banner} alt="banner" className="hidden md:block w-1/2 h-[700px] object-cover " /> */}
        {/* </div> */}
        <div className='w-full flex flex-col items-center'>
          <div className="flex flex-col items-start md:flex-row md:items-center gap-5 mb-10">
            <img src={logo} alt="logo" className="h-10 md:h-16  w-10 md:w-16 rounded-full" />
            <h1 className="text-sky font-medium">Welcome back</h1>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

Index.getLayout = getNoneLayout
export default Index
