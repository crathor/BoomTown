import { UPDATE_FORM, RESET_FORM, RESET_IMAGE } from '../actions/types'

const initialState = {
  imageurl:
    'https://dummyimage.com/370X200/cccccc/212121.png&text=Select+an+image',
  title: 'Name your item',
  description: 'Describe your item',
  itemowner: { email: 'codyrathor@gmail.com', fullname: 'crathor' },
  created: new Date(),
  tags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        ...action.payload
      }
    case RESET_IMAGE:
      return {
        ...state,
        imageurl: initialState.imageurl
      }
    case RESET_FORM:
      return {
        ...initialState
      }

    default:
      return state
  }
}
