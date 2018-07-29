import React from 'react'
import { Grid, withStyles, Grow } from '@material-ui/core'
import ItemCard from '../../components/ItemCard'
import ItemsContainer from '../../containers/ItemsContainer'
import MainGrid from '../../components/MainGrid'
import styles from './styles'
import LoadingPage from '../../components/LoadingPage'

const Items = ({ classes }) => (
  <ItemsContainer>
    {({ itemsData: { loading, error, items } }) => {
      if (loading) return <LoadingPage />
      return (
        <MainGrid>
          {items.map(item => (
            <Grow
              key={item.id}
              in
              style={{ transformOrigin: '50% 0' }}
              timeout={1000}
            >
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <ItemCard item={item} />
              </Grid>
            </Grow>
          ))}
        </MainGrid>
      )
    }}
  </ItemsContainer>
)

export default withStyles(styles)(Items)
