import { withStyles, Grid } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles'
import ShareForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

const Share = ({ classes, item }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.root}
    >
      <Grid item xs={4}>
        <ShareItemPreview item={item} />
      </Grid>
      <Grid item xs={6}>
        <ShareForm />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    item: state.item
  }
}
export default connect(mapStateToProps)(withStyles(styles)(Share))
