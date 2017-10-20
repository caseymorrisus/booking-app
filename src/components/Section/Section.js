import React, {Component} from 'react'
import M from 'moment'
import Booking from '../Booking'
import './Section.css'

class Section extends Component {
  createSectionHeader([booking]) {
    const today = M(booking.start).isSame(M(), 'd')
    const date = M(booking.start).format('ddd MMM D')
    return today ? `Today ${date}` : date
  }

  render() {
    const {bookings} = this.props.section
    //let bookingList = <tr><td>No bookings to display.</td></tr>

    /*if (this.props.section && bookings.length) {
      bookingList = bookings.map(booking => (
        <Booking key={booking.id} booking={booking}/>
      ))
    }*/

    const bookingList = bookings.map(booking => (
      <Booking key={booking.id} booking={booking}/>
    ))

    const sectionHeader = this.createSectionHeader(bookings)

    return (
      <tbody id={this.props.id}>
        <tr className="section-header"><th colSpan="2">{sectionHeader}</th></tr>
        {bookingList}
      </tbody>
    )
  }
}

export default Section