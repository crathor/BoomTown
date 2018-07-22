import { UPDATE_FORM } from './types'

export const updateForm = state => {
  const tags = state.tags ? state.tags.map(tag => JSON.parse(tag)) : []
  return {
    type: UPDATE_FORM,
    payload: {
      imageurl: state.imageurl,
      tags,
      title: state.title,
      description: state.description
    }
  }
}
