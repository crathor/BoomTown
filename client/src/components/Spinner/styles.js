const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    background: theme.palette.secondary.main
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  quote: {
    color: '#fff'
  },
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
