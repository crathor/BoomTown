export const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.tags || values.tags.length === 0) {
    errors.tags = 'Required'
  }

  return errors
}
