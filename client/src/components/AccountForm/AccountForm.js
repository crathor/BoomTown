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

/**
 * @TODO: Uncomment the following lines when authentication is added to the form
 *
 *
 * import AuthContainer from '../../containers/AuthContainer'
 * import validate from './helpers/validation'
 */

import { Form, Field } from 'react-final-form'
import styles from './styles'

class AccountForm extends Component {
  state = {
    formToggle: true
  }
  handleSubmit = values => {
    console.log(values)
  }
  validate = values => {
    let errors = {}
    if (!values.email) {
      errors.email = 'An email is required'
    }
    if (!this.state.formToggle) {
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
  render() {
    const { classes } = this.props

    return (
      // @TODO: Wrap in <AuthContainer />
      <Form
        onSubmit={this.handleSubmit}
        validate={this.validate}
        render={({ handleSubmit, invalid, submitting, values, pristine }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
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
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={pristine || invalid || submitting}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState(prevState => ({
                        formToggle: !prevState.formToggle
                      }))
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {/* @TODO: Display sign-up and login errors */}
            </Typography>
          </form>
        )}
      />
      // @TODO: Close <AuthContainer />
    )
  }
}

export default withStyles(styles)(AccountForm)
