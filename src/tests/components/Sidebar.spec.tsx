import { waitFor, screen } from '@testing-library/react'
import { Sidebar } from 'components/Sidebar'
import { renderWithProviders } from 'test-utils'
import userEvent from '@testing-library/user-event'

jest.mock('firebase/database', () => ({
  ...jest.mock('firebase/database'),
  getDatabase: jest.fn(),
}))

describe('Sidebar component', () => {
  it('should fill search input', async () => {
    renderWithProviders(<Sidebar />)

    const inputValue = 'City Search'
    const input = screen.getByTestId('search') as HTMLInputElement
    userEvent.type(input, inputValue)

    await waitFor(() => {
      expect(input.value).toEqual(inputValue)
    })
  })
})
