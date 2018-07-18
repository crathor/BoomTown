import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import React from 'react'
import { updateTitle } from '../../redux/actions'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div>
      <p>
        This is the share page located at <code>/share</code>.
      </p>
    </div>
  )
}

export default connect(
  null,
  { updateTitle }
)(withStyles(styles)(Share))
