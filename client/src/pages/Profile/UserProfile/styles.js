const styles = theme => ({
  root: {
    margin: 12,
    [theme.breakpoints.up('sm')]: {
      margin: 0
    }
  },
  content: {
    paddingTop: 0
  },
  header: {
    paddingBottom: 0
  },
  profileHeader: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6
    }
  },
  itemCount: {
    fontWeight: 700,
    marginRight: 8
  },
  userItemInfoContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

export default styles
