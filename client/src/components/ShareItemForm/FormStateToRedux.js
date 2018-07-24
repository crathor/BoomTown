import React from 'react'
import { connect } from 'react-redux'
import { FormSpy } from 'react-final-form'
import { updateForm } from '../../redux/actions'

const FormStateToRedux = ({ updateForm }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      updateForm(values)
    }}
  />
)

export default connect(
  undefined,
  { updateForm }
)(FormStateToRedux)
