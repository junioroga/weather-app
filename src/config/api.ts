import axios from 'axios'

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
export const API_HEADER_DEFAULT = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'App-Version': process.env.EXPO_PUBLIC_APP_VERSION,
  key: process.env.EXPO_PUBLIC_API_KEY,
}

// -----------------------------------------------------------------------------
// Instance
// -----------------------------------------------------------------------------
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 3 * 60 * 1000, // 3 minutes
  headers: API_HEADER_DEFAULT,
})
