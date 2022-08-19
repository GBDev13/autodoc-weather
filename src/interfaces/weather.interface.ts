import { weatherTypes } from '../components/WeatherVideoBackground'

export type WeatherMainTypes = typeof weatherTypes[number]

export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    icon: string
    description: string
    main: WeatherMainTypes
  }[]
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  name: string
}

export type WeatherCity = {
  name: string
  lat: number
  lon: number
}

export interface LogData {
  cityId: string
  min: number
  max: number
}
