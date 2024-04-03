import { useHookstate } from '@hookstate/core'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Auth from 'src/state/Auth'

const LoginRedirect = () => {
  const { authenticated } = useHookstate(Auth)
  if (!authenticated.value) {
    return <Navigate to="/login" />
  }
  return null
}

export default LoginRedirect
