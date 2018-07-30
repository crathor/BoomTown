import React from 'react'
import { Grid, Grow } from '@material-ui/core'
import ItemCard from '../ItemCard'
import PropTypes from 'prop-types'

const UserItems = ({ items, match, viewer }) => {
  return items.map(item => (
    <Grow
      key={item.id}
      in
      style={{ transformOrigin: '50% 100%' }}
      timeout={1000}
    >
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <ItemCard item={item} hideButton={match.params.userid === viewer.id} />
      </Grid>
    </Grow>
  ))
}

UserItems.propTypes = {
  items: PropTypes.array.isRequired,
  match: PropTypes.object,
  viewer: PropTypes.object.isRequired
}

export default UserItems
