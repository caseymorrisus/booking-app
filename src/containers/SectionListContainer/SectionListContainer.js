import React, {Component} from 'react'
import Fuse from 'fuse.js'
import M from 'moment'
import {connect} from 'react-redux'
import SectionList from '../../components/SectionList'

class SectionListContainer extends Component {
  filterByMonth(bookings, month, query) {
    // bypass month filter when searching
    return !this.props.searchOpen
      ? bookings.filter(booking => M(booking.start).month() === month)
      : bookings
  }

  filterBySearch(bookings, query) {
    // bypass search if query is empty
    return query.length
      ? new Fuse(bookings.toArray(), {
        keys: ['eventName', 'roomName'],
        // set to exact search (not case-sensitive)
        threshold: 0.0
      }).search(query)
      : bookings
  }

  sortBookings(bookings) {
    return [...bookings].sort((a, b) => new Date(a.start) - new Date(b.start))
  }

  render() {
    const {bookings, month, searchQuery} = this.props
    const bookingsForMonth = this.filterByMonth(bookings, month, searchQuery)
    const bookingsAfterSearch = this.filterBySearch(bookingsForMonth, searchQuery)
    const sortedBookings = this.sortBookings(bookingsAfterSearch)

    return(<SectionList bookings={sortedBookings}/>)
  }
}

const mapStateToProps = state => ({
  bookings: state.get('bookings'),
  month: state.get('month'),
  searchQuery: state.get('searchQuery'),
  searchOpen: state.get('searchOpen')
})

export default connect(
  mapStateToProps
)(SectionListContainer)