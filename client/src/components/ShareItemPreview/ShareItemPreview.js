import React from 'react'
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'
import { ViewerContext } from '../../context/ViewerProvider'
import PropTypes from 'prop-types'

const ShareItemPreview = ({ item }) => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return '...loading'
      item.itemowner = {
        email: viewer.email,
        fullname: viewer.fullname
      }
      item.created = new Date()
      return (
        <div style={{ width: '450px', height: '550px', marginRight: 10 }}>
          <ItemCard item={item} hideButton />
        </div>
      )
    }}
  </ViewerContext.Consumer>
)

ShareItemPreview.propTypes = {
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    item: state.item
  }
}
export default connect(mapStateToProps)(ShareItemPreview)
