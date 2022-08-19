import { WeatherData } from 'interfaces/weather.interface'
import { IWeather } from 'store/types'
import weatherReducer, {
  setAvailableCities,
  setCurrentCityName,
  setCurrentCityWeather,
} from 'store/slices/weather'

describe('Weather reducer', () => {
  const state: IWeather = {
    availableCities: [],
    currentCityName: null,
    currentCityWeather: {} as WeatherData,
    isFetchingCity: true,
  }

  it('should handle initial state', () => {
    const initialState: IWeather = state
    const action = { type: 'unknown' }
    const expectedState = initialState

    expect(weatherReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle setCurrentCityName', () => {
    const initialState: IWeather = { ...state, currentCityName: null }
    const action = setCurrentCityName('test')
    const expectedState: IWeather = { ...state, currentCityName: 'test' }

    expect(weatherReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle setAvailableCities without state.currentCityName', () => {
    const weatherCity = {
      name: 'fake city',
      lat: 123,
      lon: 123,
    }

    const citiesArray = [weatherCity, weatherCity]

    const initialState: IWeather = { ...state, currentCityName: null }
    const action = setAvailableCities(citiesArray)
    const expectedState: IWeather = {
      ...state,
      currentCityName: weatherCity.name,
      availableCities: citiesArray,
    }

    expect(weatherReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle setAvailableCities with state.currentCityName', () => {
    const weatherCity = {
      name: 'fake city',
      lat: 123,
      lon: 123,
    }

    const citiesArray = [{ ...weatherCity, name: 'fake city 2' }, weatherCity]

    const initialState: IWeather = {
      ...state,
      currentCityName: weatherCity.name,
    }
    const action = setAvailableCities(citiesArray)
    const expectedState: IWeather = {
      ...state,
      currentCityName: weatherCity.name,
      availableCities: citiesArray,
    }

    expect(weatherReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle setCurrentCityWeather', () => {
    const fakeCity = {
      name: 'city',
    } as WeatherData

    const initialState: IWeather = {
      ...state,
      currentCityWeather: {} as WeatherData,
    }
    const action = setCurrentCityWeather(fakeCity)
    const expectedState: IWeather = { ...state, currentCityWeather: fakeCity }

    expect(weatherReducer(initialState, action)).toEqual(expectedState)
  })
})
