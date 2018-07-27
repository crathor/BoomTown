import { Query } from 'react-apollo'
import React from 'react'

import { VIEWER_QUERY } from '../apollo/queries'

export const ViewerContext = React.createContext()

export const ViewerProvider = ({ children }) => {
  return (
    <Query query={VIEWER_QUERY} fetchPolicy="network-only">
      {({ data: { viewer }, loading, error }) => (
        <ViewerContext.Provider value={{ viewer, loading, error }}>
          {children}
        </ViewerContext.Provider>
      )}
    </Query>
  )
}
