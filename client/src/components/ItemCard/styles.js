const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'cover',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      margin: 12
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  actions: {
    marginTop: 'auto'
  },
  button: {
    marginBottom: 10
  },
  hideButton: {
    display: 'none'
  }
})

export default styles
