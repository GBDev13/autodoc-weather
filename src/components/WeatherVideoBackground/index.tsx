import { useCallback, useMemo } from 'react'
import { useAppSelector } from '../../store/hooks'
import { WeatherVideoBgContainer } from './styles'

export const weatherTypes = [
  'Thunderstorm',
  'Drizzle',
  'Rain',
  'Snow',
  'Atmosphere',
  'Clear',
  'Clouds',
] as const

export function WeatherVideoBackground() {
  const { currentCityWeather: weatherData } = useAppSelector(
    (state) => state.weather,
  )

  const weatherType = weatherData?.weather[0].main

  const getVideoUrl = useCallback(() => {
    if (!weatherTypes.includes(weatherType)) {
      return '/videos/atmosphere.mp4'
    }
    return `/videos/${weatherType.toLowerCase()}.mp4`
  }, [weatherType])

  const videoUrl = useMemo(() => getVideoUrl(), [getVideoUrl])

  return (
    <WeatherVideoBgContainer autoPlay loop playsInline muted key={videoUrl}>
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </WeatherVideoBgContainer>
  )
}
