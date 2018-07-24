import React, { Component } from 'react'
import {
  TextField,
  Typography,
  withStyles,
  Button,
  Grid
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import CheckBoxItem from './CheckBoxItem'
import { Form, Field, FormSpy } from 'react-final-form'
import styles from './styles'
import { validate } from './helpers/validation'
import { connect } from 'react-redux'
import { updateForm, resetImage, resetForm } from '../../redux/actions'

class ShareForm extends Component {
  state = {
    fileSelected: false,
    imageurl: '',
    submitted: false
  }
  componentWillUnmount = () => {
    this.props.resetForm()
  }

  handleSubmit = values => {
    console.log(values)
  }
  maxCharLength = (charLimit, value) => {
    if (value.length > charLimit) {
      return value.slice(0, value.length - 1)
    }
    return value
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }
  getAndSortTags = tags => {
    if (tags) {
      return tags.map(tag => JSON.parse(tag)).sort((a, b) => a.title > b.title)
    }
    return []
  }
  dispatchUpdate(values, updateForm) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateForm({
          imageurl
        })
      })
    }
    const tags = this.getAndSortTags(values.tags)
    updateForm({
      ...values,
      tags
    })
  }
  render() {
    const { classes, resetForm, resetImage, updateForm } = this.props
    return (
      <ItemsContainer>
        {({ tagData: { loading, error, tags } }) => {
          if (loading) return '...loading'
          if (error) return `Error: ${error.message}`
          return (
            <Form
              onSubmit={this.handleSubmit}
              validate={validate}
              render={({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, updateForm)
                      }
                      return ''
                    }}
                  />
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
                            const value = this.maxCharLength(
                              150,
                              e.target.value
                            )
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
                      {tags &&
                        tags.map(tag => (
                          <CheckBoxItem key={tag.id} tag={tag} />
                        ))}
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
        }}
      </ItemsContainer>
    )
  }
}

export default connect(
  undefined,
  { updateForm, resetForm, resetImage }
)(withStyles(styles)(ShareForm))
