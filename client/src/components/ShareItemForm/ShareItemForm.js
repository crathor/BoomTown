import React, { Component } from 'react'
import {
  TextField,
  Typography,
  withStyles,
  Button,
  Grid,
  Input
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
    // if (!values.imageurl) {
    //   errors.imageurl = 'Required'
    // }
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.description) {
      errors.description = 'Required'
    }
    if (!values.tags) {
      errors.tags = 'Required'
    }
    return errors
  }
  maxCharLength = (charLimit, value) => {
    if (value.length > charLimit) {
      return value.slice(0, value.length - 1)
    }
    return value
  }
  render() {
    const { classes } = this.props
    return (
      <Form
        onSubmit={this.handleSubmit}
        validate={this.validate}
        render={({ handleSubmit, reset, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormStateToRedux />
            <Typography variant="display4" className={classes.headline}>
              Share. Borrow. Prosper.
            </Typography>
            <Field name="imageurl">
              {(input, meta) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.uploadButton}
                >
                  Upload an Image
                </Button>
              )}
            </Field>
            <div>
              <Field name="title">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    onChange={e => {
                      const value = this.maxCharLength(55, e.target.value)
                      input.onChange(value)
                    }}
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
                    onChange={e => {
                      const value = this.maxCharLength(150, e.target.value)
                      input.onChange(value)
                    }}
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
                      <CheckBoxItem key={tag.id} tag={tag} />
                    ))
                  }}
                </ItemsContainer>
              </Grid>
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                disabled={submitting || pristine || invalid}
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    )
  }
}

export default withStyles(styles)(ShareForm)
