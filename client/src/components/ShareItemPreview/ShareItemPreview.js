import React from 'react'
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'
import { ViewerContext } from '../../context/ViewerProvider'

const ShareItemPreview = ({ item }) => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return '...loading'
      item.itemowner = {
        email: viewer.email,
        fullname: viewer.fullname
      }
      return <ItemCard item={item} hideButton />
    }}
  </ViewerContext.Consumer>
)

const mapStateToProps = state => {
  return {
    item: state.item
  }
}
export default connect(mapStateToProps)(ShareItemPreview)
