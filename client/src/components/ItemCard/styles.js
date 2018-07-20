const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    background: theme.palette.primary.main
  },
  card: {
    margin: 12,
    [theme.breakpoints.up('md')]: {
      minHeight: 520
    }
  },
  button: {
    margin: '15px 0'
  },
  content: {
    justifyContent: 'center'
  }
})

export default styles
