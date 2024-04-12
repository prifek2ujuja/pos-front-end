import { useHookstate } from '@hookstate/core'
import { jwtDecode } from 'jwt-decode'
import Auth from 'src/state/Auth'

type TokenData = {
  role: string
  userId: string
}
const useDecodeToken = () => {
  const { token } = useHookstate(Auth)
  if (token.value) {
    const tokenData = jwtDecode(token.value as string)
    return tokenData as TokenData
  }
  return null
}

export default useDecodeToken
