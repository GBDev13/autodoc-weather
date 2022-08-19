import { createSlice } from '@reduxjs/toolkit'
import { WeatherData } from '../../interfaces/weather.interface'
import { getCityWeather } from '../../services/weather.service'
import { IWeather } from '../types'

const initialState: IWeather = {
  availableCities: [],
  currentCityName: null,
  currentCityWeather: {} as WeatherData,
  isFetchingCity: true,
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentCityName: (state, action) => {
      state.currentCityName = action.payload
    },
    setAvailableCities: (state, action) => {
      const cities = action.payload

      if (!state.currentCityName) state.currentCityName = cities[0].name

      state.availableCities = cities
    },
    setCurrentCityWeather: (state, action) => {
      state.currentCityWeather = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCityWeather.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentCityWeather = action.payload.data
        if (action.payload.setCurrent) {
          state.currentCityName = action.payload.data.name
        }
      } else {
        console.log('erro')
      }
      state.isFetchingCity = false
    })
    builder.addCase(getCityWeather.pending, (state) => {
      state.isFetchingCity = true
    })
  },
})

export const { setCurrentCityName, setAvailableCities, setCurrentCityWeather } =
  weatherSlice.actions

export default weatherSlice.reducer
