import { useCallback, useEffect, useState } from 'react'
import { getCityWeather } from 'services/weather.service'
import { useDebounce } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentCityName } from '../../store/slices/weather'
import {
  NavButton,
  SearchContainer,
  SearchInput,
  SidebarContainer,
} from './styles'

export function Sidebar() {
  const { currentCityName, availableCities } = useAppSelector(
    (state) => state.weather,
  )

  const dispatch = useAppDispatch()

  function handleSelectCity(city: string) {
    dispatch(setCurrentCityName(city))
  }

  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 1000)

  const searchCityWeather = useCallback(async () => {
    if (!searchValue.trim()) return
    dispatch(getCityWeather({ cityName: searchValue }))
  }, [dispatch, searchValue])

  useEffect(() => {
    searchCityWeather()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <SidebarContainer>
      <div>
        <h4>Selecione ou busque uma cidade</h4>
        <SearchContainer>
          <SearchInput
            placeholder='Nome da cidade...'
            onChange={({ target }) => setSearchValue(target.value)}
            value={searchValue}
            data-testid='search'
          />
        </SearchContainer>
      </div>
      <nav>
        {availableCities.map((city) => (
          <NavButton
            key={city.name}
            isActive={city.name === currentCityName}
            onClick={() => handleSelectCity(city.name)}
          >
            {city.name}
          </NavButton>
        ))}
      </nav>
    </SidebarContainer>
  )
}
