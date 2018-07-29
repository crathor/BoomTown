import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import Spinner from '../Spinner'

import styles from './styles'

const LoadingPage = ({ classes }) => {
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={6} className={classes.loader}>
        <Spinner color="primary" size={100} />
        <Typography className={classes.quote} variant="display1">
          "Just a few seconds til the Boom"
        </Typography>
      </Grid>
    </Grid>
  )
}

LoadingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoadingPage)
