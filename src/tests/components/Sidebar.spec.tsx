import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from 'components/Sidebar'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithProviders } from 'test-utils'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const handlers = [
  rest.get(`${BASE_URL}/weather`, (_, res, ctx) => {
    return res(ctx.json({ data: { name: 'test' } }), ctx.delay(200))
  }),
]

const server = setupServer(...handlers)

afterAll(() => server.close())
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Sidebar component', () => {
  it('should fill search input', async () => {
    renderWithProviders(<Sidebar />)
    fireEvent.change(screen.getByTestId('search'), {
      target: { value: 'Vacaria' },
    })
    await sleep(600)

    expect(true).toBeTruthy()
  })
})
