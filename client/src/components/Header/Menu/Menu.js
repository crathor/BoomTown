import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  withStyles
} from '@material-ui/core'
import { Fingerprint, PowerSettingsNew, MoreVert } from '@material-ui/icons'
import { Link } from 'react-router-dom'

import styles from './styles'
class DropMenu extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/profile/1" style={{ outline: 'none' }}>
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <Fingerprint />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </MenuItem>
          </Link>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset primary="Sign Out" />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(DropMenu)
