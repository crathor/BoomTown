import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items'
import Profile from '../pages/Profile'
import Share from '../pages/Share'
import Home from '../pages/Home'
import Header from '../components/Header'

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Header />
    <Switch>
      <Route exact path="/welcome" component={Home} />
      <Route exact path="/items" component={Items} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userid" component={Profile} />
      <Route exact path="/share" component={Share} />
      <Redirect to="/welcome" />
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
    </Switch>
  </Fragment>
)
