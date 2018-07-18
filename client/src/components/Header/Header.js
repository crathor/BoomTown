import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import BoomTownLogo from '../../images/boomtown.svg'

import styles from './styles'

const Header = props => {
  const { classes } = props
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.homeButton}
          color="inherit"
          aria-label="Menu"
          to="/items"
          component={Link}
        >
          <img src={BoomTownLogo} alt="" className={classes.logo} />
        </IconButton>
        <Button
          component={Link}
          to="/share"
          variant="extendedFab"
          color="primary"
          className={classes.button}
        >
          <AddIcon style={{ marginRight: '10px' }} /> Share Something
        </Button>
        <Menu />
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
