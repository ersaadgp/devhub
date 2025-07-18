import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`,
  },
})

export default axiosInstance
