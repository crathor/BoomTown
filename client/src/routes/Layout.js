import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items'
import Profile from '../pages/Profile'
import Share from '../pages/Share'
import Home from '../pages/Home'
import Header from '../components/Header'
import { ViewerContext } from '../context/ViewerProvider'

export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return '...loading'
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" name="home" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        )
      }
      return (
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/items" component={Items} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:userid" component={Profile} />
            <Route exact path="/share" component={Share} />
            <Redirect to="/items" />
          </Switch>
        </Fragment>
      )
    }}
  </ViewerContext.Consumer>
)
