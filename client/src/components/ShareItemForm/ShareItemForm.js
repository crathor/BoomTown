import React, { Component } from 'react'
import {
  TextField,
  Typography,
  withStyles,
  Button,
  Grid
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import FormStateToRedux from './FormStateToRedux'
import CheckBoxItem from './CheckBoxItem'
import { Form, Field } from 'react-final-form'
import styles from './styles'

class ShareForm extends Component {
  state = {}

  handleSubmit = values => {
    console.log(values)
  }
  validate = values => {
    let errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.description) {
      errors.description = 'Required'
    }
    if (!values.tags) {
      errors.tags = 'Required'
    }
    return errors
  }
  render() {
    const { classes } = this.props
    return (
      <Form
        onSubmit={this.handleSubmit}
        validate={this.validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormStateToRedux />
            <Typography variant="display4" className={classes.headline}>
              Share. Borrow. Prosper.
            </Typography>
            <Button>Upload an Image</Button>
            <div>
              <Field name="title">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="name your item"
                    autoComplete="off"
                  />
                )}
              </Field>
            </div>
            <div>
              <Field name="description">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="description"
                    autoComplete="off"
                    multiline
                    rows="4"
                  />
                )}
              </Field>
            </div>
            <div>
              <Grid container justify="center">
                <ItemsContainer>
                  {({ tagData: { loading, error, tags } }) => {
                    if (loading) return '...loading'
                    if (error) return `Error: ${error.message}`
                    return tags.map(tag => (
                      <CheckBoxItem key={tag.id} {...tag} />
                    ))
                  }}
                </ItemsContainer>
              </Grid>
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    )
  }
}

export default withStyles(styles)(ShareForm)
