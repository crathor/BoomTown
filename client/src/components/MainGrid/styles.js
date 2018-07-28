const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    background: theme.palette.secondary.main,
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 8
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 10
    }
  }
})

export default styles
