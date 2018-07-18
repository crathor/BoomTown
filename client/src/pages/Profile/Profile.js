import { withStyles } from '@material-ui/core/styles'
import React, { Fragment } from 'react'
import { Grid, Card, CardHeader, Avatar, Typography } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import ItemCard from '../../components/ItemCard'

import styles from './styles'

const Profile = ({ classes, match }) => (
  <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { loading, error, user } }) => {
      if (loading) return '...loading'
      if (error) return `Error: ${error.message}`
      return (
        <Grid
          className={classes.root}
          container
          justify="flex-start"
          alignItems="center"
          spacing={24}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title={user.fullname}>
                <Avatar className={classes.avatar}>R</Avatar>
              </CardHeader>
            </Card>
          </Grid>
          {user.items.map(item => (
            <Grid key={item.id} item xs={4}>
              <ItemCard {...item} />
            </Grid>
          ))}
        </Grid>
      )
    }}
  </ItemsContainer>
)

export default withStyles(styles)(Profile)
