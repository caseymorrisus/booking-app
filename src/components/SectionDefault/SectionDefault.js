import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../Section/Section.css'

class SectionDefault extends Component {
  render() {
    const content = this.props.searchOpen
      ? 'No bookings to display, try creating one or refining your search.'
      : 'No bookings to display, try creating one.'

    return (
      <tbody>
        <tr className="section-header"><th colSpan="2">No bookings</th></tr>
        <tr className="section-empty"><td colSpan="2">{content}</td></tr>
      </tbody>
    )
  }
}

const mapStateToProps = state => ({
  searchOpen: state.get('searchOpen')
})

export default connect(
  mapStateToProps
)(SectionDefault)