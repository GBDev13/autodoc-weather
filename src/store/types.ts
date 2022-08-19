import { WeatherCity, WeatherData } from '../interfaces/weather.interface'
import { RootState } from '.'

export interface IWeather {
  currentCityName: string | null
  availableCities: WeatherCity[]
  currentCityWeather: WeatherData
  isFetchingCity: boolean
}

export interface IState extends RootState {
  weather: IWeather
}
