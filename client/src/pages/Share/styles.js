const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 18,
      paddingTop: 80
    }
  },
  headline: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    fontSize: theme.typography.display4.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.display2.fontSize
    }
  },
  subheading: {
    fontWeight: 400,
    color: 'white'
  }
})

export default styles
