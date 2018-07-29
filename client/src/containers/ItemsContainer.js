import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'
import { ViewerContext } from '../context/ViewerProvider'

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'

const itemsData = ({ render }) => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer, error }) => {
        if (loading) return '...loading'
        return (
          <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
            {({ loading, error, data: { items } = {} }) =>
              render({ loading, error, items })
            }
          </Query>
        )
      }}
    </ViewerContext.Consumer>
  )
}

const userItemsData = ({ id, render }) => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer, error }) => {
        if (loading) return '...loading'
        return (
          <Query
            query={ALL_USER_ITEMS_QUERY}
            variables={{ id: id || viewer.id }}
          >
            {({ loading, error, data: { user } = {} }) =>
              render({
                loading,
                error,
                user,
                viewer,
                viewer: { id: viewer.id }
              })
            }
          </Query>
        )
      }}
    </ViewerContext.Consumer>
  )
}

const tagData = ({ render }) => (
  <Query query={ALL_TAGS_QUERY}>
    {({ loading, error, data: { tags } = {} }) =>
      render({ loading, error, tags })
    }
  </Query>
)

const addItem = ({ render }) => {
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer, error }) => {
        if (loading) return '...loading'
        return (
          <Mutation
            variables={{ user: { ...viewer } }}
            mutation={ADD_ITEM_MUTATION}
            refetchQueries={result => [
              { query: ALL_USER_ITEMS_QUERY, variables: { id: viewer.id } }
            ]}
          >
            {(mutation, { data, error, loading }) =>
              render({ mutation, data, error, loading })
            }
          </Mutation>
        )
      }}
    </ViewerContext.Consumer>
  )
}
const ItemsContainer = adopt({
  tagData,
  itemsData,
  userItemsData,
  addItem
})

export default ItemsContainer
