import { createAsyncThunk } from '@reduxjs/toolkit'
import { ref, set } from 'firebase/database'
import { addDoc, collection } from 'firebase/firestore'
import { WeatherCity, WeatherData } from '../interfaces/weather.interface'
import { api } from '../lib/axios'
import { db, storage } from '../lib/firebase'
import { IState } from '../store/types'

export interface GetCityParams {
  city?: WeatherCity
  cityName?: string
}

export const getCityWeather = createAsyncThunk(
  'weather/getCityWeather',
  async (cityData: GetCityParams, thunkAPI) => {
    const { weather } = thunkAPI.getState() as IState
    const { availableCities } = weather

    try {
      const { data } = await api.get<WeatherData>('/weather', {
        params: {
          ...(cityData?.cityName && { q: cityData.cityName }),
          ...(cityData?.city?.name && {
            lat: cityData.city.lat,
            lon: cityData.city.lon,
          }),
          appid: '848e63ecf386042d43ccdd34d8ee3658',
          lang: 'pt_br',
          units: 'metric',
        },
      })

      const cityAlreadyExists = availableCities?.some(
        (city) => city.name === data.name,
      )

      if (availableCities?.length > 0 && !cityAlreadyExists) {
        set(ref(db, 'cities/' + data.name), {
          ...data.coord,
        })
      }

      const logRef = collection(storage, 'logs')
      await addDoc(logRef, {
        cityId: data.name,
        max: data.main.temp_max,
        min: data.main.temp_min,
      })

      return { data, ...(cityData?.cityName && { setCurrent: true }) }
    } catch {
      return null
    }
  },
)
