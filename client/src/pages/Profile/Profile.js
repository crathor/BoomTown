import React, { Fragment } from 'react'
import {
  Grid,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grow
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import ItemCard from '../../components/ItemCard'
import MainGrid from '../../components/MainGrid'
import Gravatar from 'react-gravatar'

import styles from './styles'
import LoadingPage from '../../components/LoadingPage'

const getAmountOfUserItems = arr => {
  switch (arr.length) {
    case 1:
      return <span>{arr.length} Item shared</span>
    default:
      return <span>{arr.length} Items shared</span>
  }
}
const getAmountOfBorrowedUserItems = arr => {
  switch (arr.length) {
    case 1:
      return <span>{arr.length} Item borrowed</span>
    default:
      return <span>{arr.length} Items borrowed</span>
  }
}

const Profile = ({ classes, match }) => (
  <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { loading, error, user } }) => {
      if (loading) return <LoadingPage />
      const amountOfUserItems = getAmountOfUserItems(user.items)
      const amountOfUserBorrowedItems = getAmountOfBorrowedUserItems(
        user.borrowed
      )
      const userData = (
        <Grid item xs={12}>
          <Card raised className={classes.profileHeader}>
            <CardHeader
              className={classes.header}
              avatar={
                <Gravatar email={user.email} style={{ borderRadius: '50%' }} />
              }
              title={
                <Typography color="textSecondary" variant="display3">
                  {user.fullname}
                </Typography>
              }
            />
            <CardContent className={classes.content}>
              <Typography variant="headline">
                {amountOfUserItems} {amountOfUserBorrowedItems}
              </Typography>
              <Typography variant="headline">{user.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )
      const userItems = user.items.map(item => (
        <Grow
          key={item.id}
          in
          style={{ transformOrigin: '50% 100%' }}
          timeout={1000}
        >
          <Grid item xs={4}>
            <ItemCard item={item} hideButton />
          </Grid>
        </Grow>
      ))
      return (
        <MainGrid>
          <Fragment>
            {userData}
            <Grid item xs={12}>
              <Typography variant="display1" color="primary">
                Shared Items
              </Typography>
            </Grid>
            {userItems}
          </Fragment>
        </MainGrid>
      )
    }}
  </ItemsContainer>
)

export default withStyles(styles)(Profile)
