import React, { Component } from 'react'
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

class Header extends Component {
  state = {
    sharePageActive: false
  }
  hideShareButton = () => {
    this.setState({ sharePageActive: true })
  }
  showShareButton = () => {
    this.setState({ sharePageActive: false })
  }
  render() {
    const { classes } = this.props
    return (
      <AppBar position="sticky" className={classes.root}>
        <Toolbar disableGutters className={classes.toolbar}>
          <IconButton
            className={classes.homeButton}
            color="inherit"
            aria-label="Menu"
            to="/items"
            component={Link}
            onClick={this.showShareButton}
          >
            <img src={BoomTownLogo} alt="BoomTown" className={classes.logo} />
          </IconButton>
          <Slide in={!this.state.sharePageActive} direction="left">
            <Button
              onClick={this.hideShareButton}
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
            {({ viewer }) => (
              <Menu
                showShareButton={this.showShareButton}
                currentViewer={viewer.id}
              />
            )}
          </ViewerContext.Consumer>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
