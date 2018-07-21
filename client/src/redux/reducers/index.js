import { combineReducers } from 'redux'
import ShareItemReducer from './ShareItemReducer'

export default combineReducers({
  item: ShareItemReducer
})
