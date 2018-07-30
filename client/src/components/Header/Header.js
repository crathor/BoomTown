import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Slide
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import BoomTownLogo from '../../images/boomtown.svg'
import styles from './styles'
import { ViewerContext } from '../../context/ViewerProvider'
import { withRouter } from 'react-router-dom'

const Header = ({ classes, location }) => {
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar disableGutters className={classes.toolbar}>
        <IconButton
          className={classes.homeButton}
          color="inherit"
          aria-label="Menu"
          to="/items"
          component={Link}
        >
          <img src={BoomTownLogo} alt="BoomTown" className={classes.logo} />
        </IconButton>
        <Slide in={location.pathname !== '/share'} direction="left">
          <Button
            component={Link}
            to="/share"
            variant="extendedFab"
            color="primary"
            className={classes.button}
          >
            <AddIcon style={{ marginRight: 8 }} />
            Share Something
          </Button>
        </Slide>
        <ViewerContext.Consumer>
          {({ viewer }) => <Menu currentViewer={viewer.id} />}
        </ViewerContext.Consumer>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Header))
