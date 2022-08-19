import { Provider } from 'react-redux'
import { Home } from './pages/Home'
import { setupStore } from './store'
import { GlobalStyles } from './styles/global'

export function App() {
  return (
    <Provider store={setupStore()}>
      <GlobalStyles />
      <Home />
    </Provider>
  )
}
