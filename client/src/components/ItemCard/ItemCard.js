import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Gravatar from 'react-gravatar'

import styles from './styles'

const ItemCard = ({ item, classes, hideButton, history }) => {
  const itemTags = item.tags.map(tag => tag.title)
  const itemCreatedTime = new Date(item.created)
  return (
    <Card raised className={classes.card}>
      <CardMedia
        className={classes.media}
        image={item.imageurl}
        onClick={() => history.push(`/profile/${item.itemowner.id}`)}
      />
      <CardHeader
        avatar={
          <Gravatar
            email={item.itemowner.email}
            style={{ borderRadius: '50%' }}
          />
        }
        title={item.itemowner.fullname}
        subheader={moment(itemCreatedTime).fromNow()}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h2">
          {item.title}
        </Typography>
        <Typography component="p" color="textSecondary">
          {itemTags.join(', ')}
        </Typography>
        <Typography component="p" variant="subheading" paragraph>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Button
          variant="outlined"
          size="large"
          color="default"
          className={hideButton ? classes.hideButton : classes.button}
        >
          Borrow
        </Button>
      </CardActions>
    </Card>
  )
}

export default withRouter(withStyles(styles)(ItemCard))
