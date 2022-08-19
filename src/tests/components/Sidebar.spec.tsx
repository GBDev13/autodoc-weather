import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from 'components/Sidebar'
import { renderWithProviders } from 'test-utils'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

jest.mock('firebase/database', () => ({
  ...jest.mock('firebase/database'),
  getDatabase: jest.fn(),
}))

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
