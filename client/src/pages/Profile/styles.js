const styles = theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.secondary.main,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 20
    }
  },
  avatar: theme.palette.avatar
})

export default styles
