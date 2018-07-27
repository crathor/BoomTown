import gql from 'graphql-tag'

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    items {
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_ITEMS_QUERY = gql`
  query GetItems($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_USER_ITEMS_QUERY = gql`
  query GetUserItems($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    addItem(item: $item, image: $image) {
      id
    }
  }
`

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      email
      fullname
      bio
    }
  }
`
export const LOGOUT_MUTATION = gql`
  mutation {
    # @TODO: Run the logout mutation.
    return
    null
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user)
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user)
  }
`
