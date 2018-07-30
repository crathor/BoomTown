import React, { Fragment } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  withStyles,
  Avatar,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'
import styles from './styles'
import { ViewerContext } from '../../context/ViewerProvider'
import { withRouter } from 'react-router-dom'

const BorrowedItems = ({ items, classes, match, returnItem }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
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
              {match.params.userid === viewer.id && (
                <Button
                  onClick={() =>
                    returnItem.mutation({ variables: { item: item.id } })
                  }
                >
                  Return Item
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Fragment>
    )}
  </ViewerContext.Consumer>
)

BorrowedItems.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  returnItem: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(BorrowedItems))
