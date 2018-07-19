import React from 'react'
import { Grid, withStyles } from '@material-ui/core'
import styles from './styles'

const MainGrid = ({ classes, children }) => {
  return (
    <Grid container direction="row" justify="center" className={classes.root}>
      {children}
    </Grid>
  )
}

export default withStyles(styles)(MainGrid)
