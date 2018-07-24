import React from 'react'
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'

const ShareItemPreview = ({ item }) => {
  return <ItemCard item={item} />
}

const mapStateToProps = state => {
  return {
    item: state.item
  }
}
export default connect(mapStateToProps)(ShareItemPreview)
