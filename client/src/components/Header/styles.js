const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  homeButton: {
    width: 40
  },
  logo: {
    width: '100%'
  },
  toolbar: {
    margin: '0 20px'
  },
  button: {
    fontSize: 11,
    marginLeft: 'auto',
    marginRight: 16,
    paddingRight: 16,
    borderRadius: 200,
    boxShadow: 'none',
    border: 'none',
    '&:hover': {
      background: 'rgba(0,0,0,0.1)'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 14
    }
  }
})

export default styles
