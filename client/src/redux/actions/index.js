import { UPDATE_FORM, RESET_FORM, RESET_IMAGE } from './types'

export const updateForm = item => {
  return {
    type: UPDATE_FORM,
    payload: item
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
