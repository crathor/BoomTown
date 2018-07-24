import { UPDATE_FORM, RESET_FORM, RESET_IMAGE } from './types'

export const updateForm = state => {
  const tags = state.tags
    ? state.tags.map(tag => JSON.parse(tag)).sort((a, b) => {
        return a.title > b.title
      })
    : []
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
export const resetForm = () => {
  return {
    type: RESET_FORM
  }
}
export const resetImage = () => {
  return {
    type: RESET_IMAGE
  }
}
