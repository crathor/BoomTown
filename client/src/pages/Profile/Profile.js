import React from 'react'
import {
  Grid,
  withStyles,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import ItemCard from '../../components/ItemCard'
import MainGrid from '../../components/MainGrid'
import Gravatar from 'react-gravatar'

import styles from './styles'

const Profile = ({ classes, match }) => (
  <MainGrid>
    <Grid item xs={12}>
      <Card raised style={{ margin: 12 }}>
        <CardHeader
          avatar={
            <Gravatar
              email={'codyrathor@gmail.com'}
              style={{ borderRadius: '50%' }}
            />
          }
          title={'crathor'}
        />
        <CardContent className={classes.content}>Hello</CardContent>
      </Card>
    </Grid>
    <ItemsContainer id={match.params.userid}>
      {({ userItemsData: { loading, error, user } }) => {
        if (loading) return '...loading'
        if (error) return `Error: ${error.message}`
        return user.items.map(item => (
          <Grid key={item.id} item xs={4}>
            <ItemCard {...item} />
          </Grid>
        ))
      }}
    </ItemsContainer>
  </MainGrid>
)

export default withStyles(styles)(Profile)
