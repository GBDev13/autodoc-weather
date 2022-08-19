/* eslint-disable no-import-assign */
import { getCityWeather } from 'services/weather.service'
import { RootState } from 'store'
import { IWeather } from 'store/types'
import MockAdapter from 'axios-mock-adapter'
import * as fireDb from 'firebase/database'
import * as fireStore from 'firebase/firestore'
import { api, BASE_URL } from '../../lib/axios'

jest.mock('firebase/database', () => ({
  ...jest.mock('firebase/database'),
  set: jest.fn(),
  ref: jest.fn(),
  getDatabase: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  ...jest.mock('firebase/firestore'),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getFirestore: jest.fn(),
}))

describe('Weather Service', () => {
  let mock: MockAdapter

  beforeAll(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.reset()
    jest.clearAllMocks()
  })

  describe('getCityWeather', () => {
    const dispatch = jest.fn()

    const weatherCity = {
      name: 'City',
      lat: 123,
      lon: 123,
    }

    const state: RootState = {
      weather: {
        availableCities: [weatherCity],
      } as IWeather,
    }

    const mockResult = {
      coord: {
        lon: 123,
        lat: 123,
      },
      weather: [
        {
          id: 1,
          icon: '123',
          description: 'test',
          main: 'Test',
        },
      ],
      main: {
        temp: 10,
        temp_min: 20,
        temp_max: 2,
      },
      name: 'Vacaria',
    }

    it('should call API and return correct data', async () => {
      mock.onGet(`${BASE_URL}/weather`).reply(200, mockResult)

      const thunk = getCityWeather({ cityName: 'Vacaria' })
      await thunk(dispatch, () => state, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toEqual('weather/getCityWeather/pending')
      expect(calls[1][0].type).toEqual('weather/getCityWeather/fulfilled')
      expect(calls[1][0].payload).toEqual({
        data: mockResult,
        setCurrent: true,
      })
    })

    it('should save city in firebase if it not exist yet', async () => {
      mock.onGet(`${BASE_URL}/weather`).reply(200, mockResult)

      const thunk = getCityWeather({ cityName: 'Vacaria' })
      await thunk(dispatch, () => state, undefined)

      expect(fireDb.set).toBeCalledTimes(1)
    })

    it('should not save city in firebase if already exists', async () => {
      mock.onGet(`${BASE_URL}/weather`).reply(200, mockResult)

      const testCityName = 'Vacaria'

      const newState: RootState = {
        weather: {
          ...state.weather,
          availableCities: [
            {
              ...weatherCity,
              name: testCityName,
            },
          ],
        },
      }

      const thunk = getCityWeather({ cityName: testCityName })
      await thunk(dispatch, () => newState, undefined)

      expect(fireDb.set).not.toBeCalled()
    })

    it('should save log in firebase', async () => {
      mock.onGet(`${BASE_URL}/weather`).reply(200, mockResult)

      const thunk = getCityWeather({ cityName: 'Vacaria' })
      await thunk(dispatch, () => state, undefined)

      expect(fireStore.addDoc).toBeCalledTimes(1)
    })

    it('should return null if an error occurs', async () => {
      mock.onGet(`${BASE_URL}/weather`).reply(404)

      const thunk = getCityWeather({ cityName: 'City that not exists' })
      await thunk(dispatch, () => state, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toEqual('weather/getCityWeather/pending')
      expect(calls[1][0].type).toEqual('weather/getCityWeather/fulfilled')

      expect(calls[1][0].payload).toEqual(null)
    })
  })
})
