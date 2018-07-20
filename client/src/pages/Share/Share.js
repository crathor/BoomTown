import { withStyles, Grid, Typography } from '@material-ui/core'
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
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={6} justify="center">
        <ItemCard
          style={{ width: '420px' }}
          id={0}
          tags={[]}
          itemowner={{ itemowner: { email: 'codyrathor@gmail.com' } }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="display4" className={classes.headline}>
          Share. Borrow. Prosper.
        </Typography>
        <ShareForm />
      </Grid>
    </Grid>
  )
}

export default connect(
  null,
  { updateTitle }
)(withStyles(styles)(Share))
