import { onValue, ref } from 'firebase/database'
import { useCallback, useEffect, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import { Sidebar } from '../../components/Sidebar'
import { WeatherDetails } from '../../components/WeatherDetails'
import { weatherTypes } from '../../components/WeatherVideoBackground'
import { WeatherCity } from '../../interfaces/weather.interface'
import { db } from '../../lib/firebase'
import { getCityWeather } from '../../services/weather.service'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setAvailableCities } from '../../store/slices/weather'
import { themes } from '../../styles/themes'
import { HomeContainer } from './styles'

export function Home() {
  const {
    currentCityName,
    availableCities,
    currentCityWeather,
    isFetchingCity,
  } = useAppSelector((state) => state.weather)

  const currentCity = availableCities.find(
    (city) => city.name === currentCityName,
  )

  const dispatch = useAppDispatch()

  const getCurrentCityWeather = useCallback(async () => {
    if (!currentCity) return
    await dispatch(getCityWeather({ city: currentCity }))
  }, [currentCity, dispatch])

  useEffect(() => {
    getCurrentCityWeather()
  }, [getCurrentCityWeather])

  const themeKey = useMemo(() => {
    const key = currentCityWeather?.weather?.[0]?.main
    if (!weatherTypes.includes(key)) {
      return 'Atmosphere'
    }

    return key
  }, [currentCityWeather])

  const isLoading = isFetchingCity && !currentCityWeather?.name

  useEffect(() => {
    onValue(ref(db, '/cities'), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const parsed = Object.entries<(string | WeatherCity)[]>(data).map(
          ([name, data]) => ({
            name,
            ...data,
          }),
        )
        dispatch(setAvailableCities(parsed))
      }
    })
  }, [dispatch])

  return (
    <HomeContainer>
      <ThemeProvider theme={themes[themeKey ?? 'Clear']}>
        {!isLoading && <WeatherDetails />}
        <Sidebar />
      </ThemeProvider>
    </HomeContainer>
  )
}
