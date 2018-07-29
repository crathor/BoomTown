const styles = theme => ({
  mainTitle: {
    marginTop: theme.spacing.unit * 5,
    fontWeight: 700
  },
  list: {
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  }
})

export default styles
