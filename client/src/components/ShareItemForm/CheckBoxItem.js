import React from 'react'
import { Grid, Checkbox } from '@material-ui/core'
import { Field } from 'react-final-form'
import {
  Home,
  Power,
  Casino,
  Build,
  FitnessCenter,
  SdCard,
  Audiotrack,
  GolfCourse
} from '@material-ui/icons'

const CheckBoxItem = ({ id, title }) => {
  let icon
  let selected
  switch (title) {
    case 'Household items':
      icon = <Home />
      selected = <Home color="primary" />
      break
    case 'Tools':
      icon = <Build />
      selected = <Build color="primary" />
      break
    case 'Electronics':
      icon = <Power />
      selected = <Power color="primary" />
      break
    case 'Sporting Goods':
      icon = <FitnessCenter />
      selected = <FitnessCenter color="primary" />
      break
    case 'Musical Instruments':
      icon = <Audiotrack />
      selected = <Audiotrack color="primary" />
      break
    case 'Recreational Equipment':
      icon = <GolfCourse />
      selected = <GolfCourse color="primary" />
      break
    case 'Random':
      icon = <Casino />
      selected = <Casino color="primary" />
      break
    case 'Physical Media':
      icon = <SdCard />
      selected = <SdCard color="primary" />
      break

    default:
      icon = <Home />
      selected = <Home color="primary" />
      break
  }
  return (
    <Grid item xs={1}>
      <Field name={title} type="checkbox" value={title}>
        {({ input, meta }) => (
          <Checkbox icon={icon} checkedIcon={selected} {...input} />
        )}
      </Field>
    </Grid>
  )
}

export default CheckBoxItem
