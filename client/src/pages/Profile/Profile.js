import React from 'react'
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
      return <span style={{ marginRight: 8 }}>Item shared</span>
    default:
      return <span style={{ marginRight: 8 }}>Items shared</span>
  }
}
const getAmountOfBorrowedUserItems = arr => {
  switch (arr.length) {
    case 1:
      return <span>Item borrowed</span>
    default:
      return <span>Items borrowed</span>
  }
}

const Profile = ({ classes, match }) => (
  <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { loading, error, user, viewer } }) => {
      if (loading) return <LoadingPage />
      const amountOfUserItems = getAmountOfUserItems(user.items)
      const amountOfUserBorrowedItems = getAmountOfBorrowedUserItems(
        user.borrowed
      )
      const userData = (
        <Grid item xs={12} className={classes.root}>
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
              <div className={classes.userItemInfoContainer}>
                <Typography variant="headline">
                  <span className={classes.itemCount}>{user.items.length}</span>
                  {amountOfUserItems}
                </Typography>
                <Typography variant="headline" gutterBottom>
                  <span className={classes.itemCount}>
                    {user.borrowed.length}
                  </span>
                  {amountOfUserBorrowedItems}
                </Typography>
              </div>
              <Typography variant="subheading">"{user.bio}"</Typography>
              <BorrowedItems items={user.borrowed} />
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
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <ItemCard
              item={item}
              hideButton={match.params.userid === viewer.id}
            />
          </Grid>
        </Grow>
      ))
      return (
        <MainGrid>
          {userData}
          {user.items.length > 0 && (
            <Grid item xs={12} className={classes.shared}>
              <Typography variant="display1" color="primary">
                Shared Items
              </Typography>
            </Grid>
          )}
          {userItems}
        </MainGrid>
      )
    }}
  </ItemsContainer>
)

export default withStyles(styles)(Profile)
