import { withStyles, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import { updateTitle } from '../../redux/actions'

import styles from './styles'
import ShareForm from '../../components/ShareItemForm'
import ItemCard from '../../components/ItemCard'

const Share = ({ classes }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.root}
    >
      <Grid item xs={6}>
        <ItemCard
          style={{ width: '420px' }}
          id={0}
          tags={[]}
          itemowner={{ email: 'codyrathor@gmail.com' }}
        />
      </Grid>
      <Grid item xs={6}>
        <ShareForm />
      </Grid>
    </Grid>
  )
}

export default connect(
  null,
  { updateTitle }
)(withStyles(styles)(Share))
