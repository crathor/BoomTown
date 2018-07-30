import React from 'react'
import { Grid, withStyles, Typography } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import MainGrid from '../../components/MainGrid'

import styles from './styles'
import LoadingPage from '../../components/LoadingPage'
import UserProfile from '../../components/UserProfile'
import UserItems from '../../components/UserItems'
import PropTypes from 'prop-types'

const Profile = ({ classes, match }) => (
  <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { loading, error, user, viewer }, returnItem }) => {
      if (loading) return <LoadingPage />
      return (
        <MainGrid>
          <UserProfile
            user={user}
            match={match}
            viewer={viewer}
            returnItem={returnItem}
          />
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}
export default withStyles(styles)(Profile)
