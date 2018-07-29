const logUserIn = (values, login) => {
  login.mutation({
    variables: {
      user: values
    }
  })
}

export default logUserIn
