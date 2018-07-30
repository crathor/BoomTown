import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  withStyles
} from '@material-ui/core'
import BorrowedItems from '../BorrowedItems'
import styles from './styles'
import Gravatar from 'react-gravatar'
import PropTypes from 'prop-types'

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

const UserProfile = ({ user, classes, viewer, match, returnItem }) => {
  const amountOfUserItems = getAmountOfUserItems(user.items)
  const amountOfUserBorrowedItems = getAmountOfBorrowedUserItems(user.borrowed)
  return (
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
              <span className={classes.itemCount}>{user.borrowed.length}</span>
              {amountOfUserBorrowedItems}
            </Typography>
          </div>
          <Typography variant="subheading" gutterBottom>
            "{user.bio}"
          </Typography>
          {user.borrowed.length > 0 && (
            <BorrowedItems
              items={user.borrowed}
              viewer={viewer}
              match={match}
              returnItem={returnItem}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  returnItem: PropTypes.object.isRequired
}

export default withStyles(styles)(UserProfile)
