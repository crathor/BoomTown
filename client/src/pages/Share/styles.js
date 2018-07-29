const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 5,
    paddingTop: 80,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 20
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing.unit * 20
    }
  },
  rootItem: {
    maxHeight: 550,
    display: 'flex',
    justifyContent: 'center'
  }
})

export default styles
