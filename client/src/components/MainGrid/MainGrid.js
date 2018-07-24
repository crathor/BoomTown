import React from 'react'
import { Grid, withStyles } from '@material-ui/core'
import styles from './styles'

const MainGrid = ({ classes, children }) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      spacing={24}
      className={classes.root}
    >
      {children}
    </Grid>
  )
}

export default withStyles(styles)(MainGrid)
