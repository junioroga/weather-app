import { api } from '@config/api'

import { ForecastResponse, Location } from './types'

type GetForecastProps = {
  q: string
  days: string
}

type GetLocationProps = {
  q: string
}

const getForecast = async (
  options: GetForecastProps,
): Promise<ForecastResponse> => {
  const params = []
  let paramsQs = ''

  if (Object.prototype.hasOwnProperty.call(options, 'q')) {
    params.push(`q=${options.q}`)
  }

  if (Object.prototype.hasOwnProperty.call(options, 'days')) {
    params.push(`days=${options.days}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<ForecastResponse>(`forecast.json${paramsQs}`)

  return response.data
}

const getLocations = async (options: GetLocationProps): Promise<Location[]> => {
  const params = []
  let paramsQs = ''

  if (Object.prototype.hasOwnProperty.call(options, 'q')) {
    params.push(`q=${options.q}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<Location[]>(`search.json${paramsQs}`)

  return response.data
}

export { getForecast, getLocations }
