import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ItemCard from '../../components/ItemCard'
import ItemContainer from '../../containers/ItemsContainer'

import styles from './styles'

const Items = ({ classes }) => (
  <ItemContainer filter={1}>
    {({ itemsData: { loading, error, items } }) => {
      if (loading) return '...loading'
      if (error) return `Error: ${error.message}`
      return (
        <Grid
          container
          spacing={24}
          alignItems="flex-end"
          justify="center"
          className={classes.itemsGrid}
        >
          {items.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <ItemCard {...item} />
            </Grid>
          ))}
        </Grid>
      )
    }}
  </ItemContainer>
)

export default withStyles(styles)(Items)
