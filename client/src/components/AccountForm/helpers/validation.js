const validate = (values, userSignUp) => {
  let errors = {}
  if (!values.email) {
    errors.email = 'An email is required'
  }
  if (!userSignUp) {
    // checks if signing up a new user
    if (!values.fullname) {
      errors.fullname = 'Please enter your name'
    }
  }
  if (!values.password) {
    errors.password = 'Please enter a password'
  }
  return errors
}

export default validate
