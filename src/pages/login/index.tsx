import { getHeaderLayout } from 'src/components/layout'
import SignInForm from './components/SignInForm'
import Auth from 'src/state/Auth'
import { Navigate } from 'react-router-dom'

const Index = () => {
  const { authenticated } = Auth

  if (authenticated.value) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="poppins-regular bg-light-gray w-full min-h-screen">
      <div className="max-w-6xl mx-auto w-full gap-5 p-2 max-h-[800px] h-full">
        <SignInForm />
      </div>
    </div>
  )
}

Index.getLayout = getHeaderLayout
export default Index
