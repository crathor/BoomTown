import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Menu from './Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  homeButton: {
    marginLeft: 10,
    marginRight: 'auto'
  }
}

const Header = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.homeButton}
            color="inherit"
            aria-label="Menu"
          >
            <Link to="/items">Home</Link>
          </IconButton>
          <div className={styles.flex} />
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
