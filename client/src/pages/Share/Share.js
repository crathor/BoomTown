import { withStyles, Grid, Hidden } from '@material-ui/core'
import React from 'react'
import styles from './styles'
import ShareForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

const Share = ({ classes }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.root}
      spacing={8}
    >
      <Hidden xsDown>
        <Grid item xs={6} className={classes.rootItem}>
          <ShareItemPreview />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={6} className={classes.rootItem}>
        <ShareForm />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Share)
