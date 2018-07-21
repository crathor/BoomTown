import { UPDATE_FORM } from './types'

export const updateForm = state => {
  return {
    type: UPDATE_FORM,
    payload: state
  }
}
