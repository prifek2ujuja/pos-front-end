import axios from 'axios'

import Auth from 'src/state/Auth'

// Define the base URL for your API depending on the environment
const environment = import.meta.env.DEV

const baseUrl = environment ? 'http://localhost:3000' : import.meta.env.VITE_BACKEND_URL_PROD

const api = axios.create({
  baseURL: `${baseUrl}/api/`,
})

// Function to refresh the access token using your refresh token route
const refreshTokenFunction = async () => {
  const { refreshToken } = Auth
  if (refreshToken) {
    try {
      const response = await axios.post(
        // @ts-ignore
        // import.meta.env.PROD
        //   ? 'htstps://server.rocketbet.ke/api/auth/refresh'
        'https://prife-backend-production.up.railway.app/api/users/refresh',
        {
          // Add your refresh token data here
          // parse localstorage to an object
          refreshToken: refreshToken.value,
        },
      )
      const newAccessToken = response.data.accessToken
      // Update the access token from state
      Auth.token.set(newAccessToken)
      return newAccessToken
    } catch (error) {
      Auth.set({
        authenticated: false,
        avatar: null,
        refreshToken: null,
        status: null,
        token: null,
        userName: null,
        id: null,
      })
      // Handle token refresh error (e.g., redirect to login)
      window.location.href = '/'
      throw error
    }
  }
  return null
}

// Axios request interceptor to check for a 403 status code
api.interceptors.request.use(
  (config) => {
    // Get the access token from local storage
    if (Auth.token.value) {
      // Set the access token in the request header
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${Auth.token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// // Axios response interceptor to handle 403 errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      try {
        // Refresh the access token
        const newAccessToken = await refreshTokenFunction()

        // Retry the original request with the new access token
        const originalRequest = error.config
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return await axios(originalRequest)
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
        // console.log(refreshError)
        Auth.authenticated.set(false)
        Auth.token.set(null)
        Auth.refreshToken.set(null)
        // window.location.href = '/login';
        throw refreshError
      }
    }
    // if (error.response && error.response.status === 401)
    return Promise.reject(error)
  },
)

export default api
