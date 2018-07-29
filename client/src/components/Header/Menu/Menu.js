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
import { withRouter } from 'react-router-dom'
import AuthContainer from '../../../containers/AuthContainer'

import styles from './styles'
class DropMenu extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.props.showShareButton()
    this.setState({ anchorEl: null })
  }
  handleRouteChange = () => {
    this.props.showShareButton()
    this.handleClose()
    this.props.history.push(`/profile/${this.props.currentViewer}`)
  }

  render() {
    const { anchorEl } = this.state
    return (
      <AuthContainer>
        {({ logout }) => {
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
                <MenuItem onClick={this.handleRouteChange}>
                  <ListItemIcon>
                    <Fingerprint />
                  </ListItemIcon>
                  <ListItemText inset primary="Profile" />
                </MenuItem>
                <MenuItem onClick={() => logout.mutation()}>
                  <ListItemIcon>
                    <PowerSettingsNew />
                  </ListItemIcon>
                  <ListItemText inset primary="Sign Out" />
                </MenuItem>
              </Menu>
            </div>
          )
        }}
      </AuthContainer>
    )
  }
}

export default withRouter(withStyles(styles)(DropMenu))
