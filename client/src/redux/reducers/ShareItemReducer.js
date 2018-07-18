const initialState = {
  imageurl: '',
  title: '',
  description: '',
  tags: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.text
      }

    default:
      return state
  }
}
