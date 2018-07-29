import React, { Component } from 'react'
import {
  Input,
  InputLabel,
  Typography,
  Button,
  withStyles,
  FormControl,
  Grid
} from '@material-ui/core'

import AuthContainer from '../../containers/AuthContainer'
import { Form, Field } from 'react-final-form'
import styles from './styles'
import validate from './helpers/validation'
import logUserIn from './helpers/logUserIn'
import signUpUser from './helpers/signUpUser'
import Spinner from '../Spinner'

class AccountForm extends Component {
  state = {
    formToggle: true
  }

  render() {
    const { classes } = this.props
    const { formToggle } = this.state
    return (
      <AuthContainer>
        {({ signup, login }) => (
          <Form
            onSubmit={
              formToggle
                ? values => logUserIn(values, login)
                : values => signUpUser(values, signup)
            }
            validate={values => validate(values, formToggle)}
            render={({ handleSubmit, invalid, submitting, form, pristine }) => (
              <form onSubmit={handleSubmit} className={classes.accountForm}>
                {!formToggle && (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="fullname">Username</InputLabel>
                    <Field name={'fullname'}>
                      {({ input, meta }) => (
                        <Input
                          id="fullname"
                          type="text"
                          inputProps={{
                            autoComplete: 'off'
                          }}
                          {...input}
                        />
                      )}
                    </Field>
                  </FormControl>
                )}
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Field name="email">
                    {({ input, meta }) => (
                      <Input
                        id="email"
                        type="text"
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        {...input}
                      />
                    )}
                  </Field>
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Field name="password">
                    {({ input, meta }) => (
                      <Input
                        id="password"
                        type="password"
                        inputProps={{
                          autoComplete: 'off'
                        }}
                        {...input}
                      />
                    )}
                  </Field>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    {submitting ? (
                      <Spinner size={30} color="secondary" />
                    ) : (
                      <Button
                        type="submit"
                        className={classes.formButton}
                        variant="contained"
                        size="large"
                        color="secondary"
                        disabled={pristine || invalid || submitting}
                      >
                        {formToggle ? 'Enter' : 'Create Account'}
                      </Button>
                    )}
                    <Typography>
                      <button
                        className={classes.formToggle}
                        type="button"
                        onClick={() => {
                          form.reset()
                          this.setState(prevState => ({
                            formToggle: !prevState.formToggle
                          }))
                        }}
                      >
                        {formToggle
                          ? 'Create an account.'
                          : 'Login to existing account.'}
                      </button>
                    </Typography>
                  </Grid>
                </FormControl>
                <Typography className={classes.errorMessage}>
                  {login.error
                    ? 'The email/password is invalid please try again'
                    : null}
                  {signup.error
                    ? 'An account with that email already exists.'
                    : null}
                </Typography>
              </form>
            )}
          />
        )}
      </AuthContainer>
    )
  }
}

export default withStyles(styles)(AccountForm)
