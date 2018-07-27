import React, { Component, Fragment } from 'react'
import {
  TextField,
  Typography,
  withStyles,
  Button,
  Grid,
  Input
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import CheckBoxItem from './CheckBoxItem'
import { Form, Field, FormSpy } from 'react-final-form'
import styles from './styles'
import { validate } from './helpers/validation'
import { getBase64Url } from './helpers/getBase64Url'
import { getAndSortTags } from './helpers/tagsHelper'
import { maxCharLength } from './helpers/charLength'
import { connect } from 'react-redux'
import { updateForm, resetImage, resetForm } from '../../redux/actions'

class ShareForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileSelected: false,
      imageurl: '',
      submitted: false
    }
    this.fileRef = React.createRef()
  }
  componentWillUnmount = () => {
    this.props.resetForm()
  }
  handleImageReset = () => {
    this.setState({ fileSelected: false })
    this.fileRef.current.value = ''
    this.props.resetImage()
  }
  handleImageUploadSelect = () => {
    this.fileRef.current.click()
  }
  handleImageSelect = event => {
    this.setState({ fileSelected: event.target.files[0] })
  }
  handleSubmit = values => {
    console.log(values)
  }
  dispatchUpdate(values, updateForm) {
    if (!values.imageurl && this.state.fileSelected) {
      getBase64Url(this.state.fileSelected).then(imageurl => {
        updateForm({
          imageurl
        })
      })
    }
    const tags = getAndSortTags(values.tags)
    updateForm({
      ...values,
      tags
    })
  }
  saveItem = async (values, addItem) => {
    const {
      validity,
      files: [file]
    } = this.fileRef.current
    if (!validity.valid || !file) return
    try {
      const tags = getAndSortTags(values.tags)
      const itemData = {
        ...values,
        tags
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
      this.setState({ done: true })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { classes, updateForm } = this.props
    const { fileSelected } = this.state
    return (
      <ItemsContainer>
        {({ addItem, tagData: { loading, error, tags } }) => {
          if (loading) return '...loading'
          if (addItem.loading) return '...loading'
          if (error) return `Error: ${error.message}`
          return (
            <Form
              onSubmit={values => this.saveItem(values, addItem)}
              validate={validate}
              render={({
                handleSubmit,
                submitting,
                pristine,
                invalid,
                values
              }) => (
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
                      <Fragment>
                        <Button
                          variant={fileSelected ? 'outlined' : 'contained'}
                          color={fileSelected ? 'default' : 'primary'}
                          fullWidth
                          className={classes.uploadButton}
                          onClick={
                            fileSelected
                              ? this.handleImageReset
                              : this.handleImageUploadSelect
                          }
                        >
                          {fileSelected ? 'Reset Image' : 'Select an Image'}
                        </Button>
                        <Input
                          className={classes.fileUpload}
                          type="file"
                          inputRef={this.fileRef}
                          onChange={event => {
                            this.handleImageSelect(event)
                          }}
                        />
                      </Fragment>
                    )}
                  </Field>
                  <div>
                    <Field name="title">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          onChange={e => {
                            const value = maxCharLength(55, e.target.value)
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
                            const value = maxCharLength(150, e.target.value)
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
                  <pre>{JSON.stringify(addItem.error, 0, 2)}</pre>
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
