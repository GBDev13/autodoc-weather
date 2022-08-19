import { configure } from '@testing-library/react'

import '@testing-library/jest-dom'
import 'jest-styled-components'

configure({ asyncUtilTimeout: 5000 })

process.env = Object.assign(process.env, {
  VITE_API_URL: 'http://localhost',
})

module.exports = 'test-file-stub'

export {}
