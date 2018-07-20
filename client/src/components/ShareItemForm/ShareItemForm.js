import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Form, Field } from 'react-final-form'

class ShareForm extends Component {
  state = {}

  render() {
    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} />
          )}
        />
      </div>
    )
  }
}

export default ShareForm
