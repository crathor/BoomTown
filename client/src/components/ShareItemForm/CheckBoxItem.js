import React from 'react'
import { Grid, Checkbox, InputLabel, withStyles } from '@material-ui/core'
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
import PropTypes from 'prop-types'
import styles from './styles'

const CheckBoxItem = ({ tag, classes }) => {
  let icon
  let selected
  switch (tag.title) {
    case 'Household items':
      icon = <Home className={classes.checkboxIcon} />
      selected = <Home color="primary" className={classes.checkboxIcon} />
      break
    case 'Tools':
      icon = <Build className={classes.checkboxIcon} />
      selected = <Build color="primary" className={classes.checkboxIcon} />
      break
    case 'Electronics':
      icon = <Power className={classes.checkboxIcon} />
      selected = <Power color="primary" className={classes.checkboxIcon} />
      break
    case 'Sporting Goods':
      icon = <FitnessCenter className={classes.checkboxIcon} />
      selected = (
        <FitnessCenter color="primary" className={classes.checkboxIcon} />
      )
      break
    case 'Musical Instruments':
      icon = <Audiotrack className={classes.checkboxIcon} />
      selected = <Audiotrack color="primary" className={classes.checkboxIcon} />
      break
    case 'Recreational Equipment':
      icon = <GolfCourse className={classes.checkboxIcon} />
      selected = <GolfCourse color="primary" className={classes.checkboxIcon} />
      break
    case 'Random':
      icon = <Casino className={classes.checkboxIcon} />
      selected = <Casino color="primary" className={classes.checkboxIcon} />
      break
    case 'Physical Media':
      icon = <SdCard className={classes.checkboxIcon} />
      selected = <SdCard color="primary" className={classes.checkboxIcon} />
      break

    default:
      icon = <Home />
      selected = <Home color="primary" />
      break
  }
  return (
    <Grid item xs={4} sm={3}>
      <Field name="tags" type="checkbox" value={JSON.stringify(tag)}>
        {({ input, meta }) => (
          <InputLabel shrink className={classes.label}>
            <Checkbox icon={icon} checkedIcon={selected} {...input} />
            {tag.title}
          </InputLabel>
        )}
      </Field>
    </Grid>
  )
}

CheckBoxItem.propTypes = {
  classes: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired
}

export default withStyles(styles)(CheckBoxItem)
