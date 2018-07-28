import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, CircularProgress } from '@material-ui/core'

import styles from './styles'

class Spinner extends Component {
  timer = null

  state = {
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  progress = () => {
    const { completed } = this.state
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    const { classes } = this.props
    return (
      <CircularProgress
        className={classes.progress}
        color={this.props.color}
        variant="determinate"
        size={this.props.size}
        value={this.state.completed}
      />
    )
  }
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default withStyles(styles)(Spinner)
