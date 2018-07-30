import React, { Fragment } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  withStyles,
  Avatar
} from '@material-ui/core'
import PropTypes from 'prop-types'

import styles from './styles'

const BorrowedItems = ({ items, classes }) => {
  return (
    <Fragment>
      <Typography variant="button" className={classes.mainTitle} gutterBottom>
        Currently Borrowing:
      </Typography>
      <List className={classes.list}>
        {items.map(item => (
          <ListItem key={item.id} divider>
            <Avatar src={item.imageurl} />
            <ListItemText
              primary={item.title}
              secondary={item.itemowner.fullname}
            />
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}

BorrowedItems.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BorrowedItems)
