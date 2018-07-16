import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'

// @TODO: Import your reducers
import reducers from './reducers'

const middleware = []

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
