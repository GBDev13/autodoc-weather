import { useAppSelector } from '../../store/hooks'
import { MinMaxDialog } from '../MinMaxDialog'
import { WeatherIcon } from '../WeatherIcon'
import { WeatherVideoBackground } from '../WeatherVideoBackground'
import { ContentContainer, WeatherDetailsContainer } from './styles'

export function WeatherDetails() {
  const {
    currentCityName,
    availableCities,
    currentCityWeather: weatherData,
  } = useAppSelector((state) => state.weather)

  const currentCity = availableCities.find(
    (city) => city.name === currentCityName,
  )

  const { main, weather } = weatherData

  const roundedTemp = Math.round(main.temp)
  const roundedMinTemp = Math.round(main.temp_min)
  const roundedMaxTemp = Math.round(main.temp_max)

  return (
    <WeatherDetailsContainer>
      <h1>autodoc.weather</h1>

      <section>
        <ContentContainer>
          <h2>{roundedTemp}°</h2>
          <div>
            <h3>{currentCity?.name}</h3>
            <p>
              Min: {roundedMinTemp}° - Máx: {roundedMaxTemp}°
            </p>
          </div>
          <WeatherIcon code={weather[0].icon} />
        </ContentContainer>
        <MinMaxDialog>
          <button>Mostrar Min/Máx</button>
        </MinMaxDialog>
      </section>

      <WeatherVideoBackground />
    </WeatherDetailsContainer>
  )
}
