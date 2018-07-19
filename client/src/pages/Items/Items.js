import React from 'react'
import { Grid, withStyles } from '@material-ui/core/'
import ItemCard from '../../components/ItemCard'
import ItemContainer from '../../containers/ItemsContainer'

import styles from './styles'

const Items = ({ classes }) => (
  <ItemContainer filter={4}>
    {({ itemsData: { loading, error, items } }) => {
      if (loading) return '...loading'
      if (error) return `Error: ${error.message}`
      return (
        <Grid
          container
          direction="row"
          justify="center"
          className={classes.root}
        >
          {items.map(item => (
            <Grid key={item.id} item xs={12} sm={12} md={6} lg={4}>
              <ItemCard {...item} />
            </Grid>
          ))}
        </Grid>
      )
    }}
  </ItemContainer>
)

export default withStyles(styles)(Items)
