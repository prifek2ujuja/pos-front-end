import { hookstate } from '@hookstate/core'
import { Auth } from 'src/types'
import { localstored } from '@hookstate/localstored'

const InitialState: Auth = {
  authenticated: false,
  avatar: null,
  refreshToken: null,
  role: null,
  status: null,
  token: null,
  userName: null,
  id: null,
}

export default hookstate(InitialState, localstored({ key: 'auth' }))
