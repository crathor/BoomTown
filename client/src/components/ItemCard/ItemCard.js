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
import moment from 'moment'
import Gravatar from 'react-gravatar'

import styles from './styles'
import tempPhoto from '../../images/Rmj1.jpeg'

const ItemCard = ({
  id,
  imageurl,
  description,
  tags,
  title,
  created,
  itemowner,
  classes,
  style
}) => {
  const itemTags = tags.map(tag => `${tag.title}`)
  console.log(tags.length)
  const itemCreatedTime = new Date(created)
  return (
    <Card raised className={classes.card} style={style}>
      <CardMedia
        className={classes.media}
        src={tempPhoto}
        title="Contemplative Reptile"
      />
      <CardHeader
        avatar={
          <Gravatar email={itemowner.email} style={{ borderRadius: '50%' }} />
        }
        title={itemowner.fullname}
        subheader={moment(itemCreatedTime).fromNow()}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{itemTags.join(', ')}</Typography>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="large"
          color="default"
          className={classes.button}
        >
          Borrow
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(ItemCard)
