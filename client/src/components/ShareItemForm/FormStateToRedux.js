import React from 'react'
import { connect } from 'react-redux'
import { FormSpy } from 'react-final-form'
import { updateForm } from '../../redux/actions'

const FormStateToRedux = ({ updateForm }) => (
  <FormSpy
    subscription={{ values: true }}
    component={({ values }) => {
      console.log('VALUES:', values)
      if (values) {
        updateForm(values)
      }
      return ''
    }}
  />
)

export default connect(
  undefined,
  { updateForm }
)(FormStateToRedux)
