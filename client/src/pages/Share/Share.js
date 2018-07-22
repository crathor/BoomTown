import { withStyles, Grid } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles'
import ShareForm from '../../components/ShareItemForm'
import ItemCard from '../../components/ItemCard'

const Share = ({ classes, item }) => {
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
          tags={item.tags}
          title={item.title}
          description={item.description}
          created={new Date()}
          itemowner={{ email: 'codyrathor@gmail.com', fullname: 'crathor' }}
        />
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
