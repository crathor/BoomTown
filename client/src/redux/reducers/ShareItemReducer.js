import { UPDATE_FORM } from '../actions/types'

const initialState = {
  imageurl: '',
  title: '',
  description: '',
  tags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { title, description, tags, imageurl } = action.payload
      return {
        ...state,
        title,
        description,
        tags: tags || [],
        imageurl
      }

    default:
      return state
  }
}
