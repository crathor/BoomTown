import React from 'react'
import { Grid, withStyles, Typography } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import MainGrid from '../../components/MainGrid'

import styles from './styles'
import LoadingPage from '../../components/LoadingPage'
import UserProfile from '../../components/UserProfile'
import UserItems from '../../components/UserItems'

const Profile = ({ classes, match }) => (
  <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { loading, error, user, viewer } }) => {
      if (loading) return <LoadingPage />
      return (
        <MainGrid>
          <UserProfile user={user} />
          {user.items.length > 0 && (
            <Grid item xs={12} className={classes.shared}>
              <Typography variant="display1" color="primary">
                Shared Items
              </Typography>
            </Grid>
          )}
          <UserItems items={user.items} match={match} viewer={viewer} />
        </MainGrid>
      )
    }}
  </ItemsContainer>
)

export default withStyles(styles)(Profile)
