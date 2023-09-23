export type ForecastLocation = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export type Condition = {
  text: string
  icon: string
  code: number
}

export type Current = {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

export type Day = {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: {
    text: string
    icon: string
    code: number
  }
  uv: number
}

export type Astro = {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
  is_moon_up: number
  is_sun_up: number
}

export type Hour = {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
  gust_kph: number
  uv: number
}

export type ForecastDay = {
  date: string
  date_epoch: number
  day: Day
  astro: Astro
  hour: Hour[]
}

export type Forecast = {
  forecastday: ForecastDay[]
}

export type Location = {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

export type ForecastResponse = {
  current: Current
  forecast: Forecast
  location: ForecastLocation
}

export enum WeatherImages {
  'Partly cloudy' = require('../assets/images/partlycloudy.png'),
  'Moderate rain' = require('../assets/images/moderaterain.png'),
  'Patchy rain possible' = require('../assets/images/moderaterain.png'),
  'Sunny' = require('../assets/images/sun.png'),
  'Clear' = require('../assets/images/sun.png'),
  'Overcast' = require('../assets/images/cloud.png'),
  'Cloudy' = require('../assets/images/cloud.png'),
  'Light rain' = require('../assets/images/moderaterain.png'),
  'Moderate rain at times' = require('../assets/images/moderaterain.png'),
  'Heavy rain' = require('../assets/images/heavyrain.png'),
  'Heavy rain at times' = require('../assets/images/heavyrain.png'),
  'Moderate or heavy freezing rain' = require('../assets/images/heavyrain.png'),
  'Moderate or heavy rain shower' = require('../assets/images/heavyrain.png'),
  'Moderate or heavy rain with thunder' = require('../assets/images/heavyrain.png'),
  'Mist' = require('../assets/images/mist.png'),
  'other' = require('../assets/images/moderaterain.png'),
}