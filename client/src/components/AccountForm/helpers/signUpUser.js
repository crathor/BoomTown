const signUpUser = (values, signup) => {
  signup.mutation({
    variables: {
      user: values
    }
  })
}

export default signUpUser
