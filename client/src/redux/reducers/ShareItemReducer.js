import { UPDATE_FORM } from '../actions/types'

const initialState = {
  imageurl: '',
  title: 'Name your item',
  description: 'Describe your item',
  tags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { title, description, tags, imageurl } = action.payload
      return {
        ...state,
        title: title || 'Name your item',
        description: description || 'Describe your item',
        tags: tags || [],
        imageurl
      }

    default:
      return state
  }
}
