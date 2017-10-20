import React, {Component} from 'react'
import M from 'moment'
import Section from '../Section'
import SectionDefault from '../SectionDefault'
import './SectionList.css'

import {List} from 'immutable'

class SectionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionBottom: null,
      sectionTop: null
    }

    this.createSections = this.createSections.bind(this)
  }

  // convert bookings array into sections array
  createSections(bookings, lastDate) {
    return List(bookings.reduce((sec, booking) => {
      const isSameDay = M(booking.start).isSame(lastDate, 'day')
      const curr = sec.length

      if (isSameDay) {
        sec[curr - 1].bookings.push(booking)
      } else {
        sec.push({bookings: [booking]})
      }

      lastDate = booking.start
      return sec
    }, []))
  }

  render() {
    const {bookings} = this.props
    const sections = this.createSections(bookings, '')

    const sectionsDOM = bookings.length
      ? sections.map((section, i) => {
        const id = M(section.bookings[0].start).startOf('day').valueOf()
        const ref = i === 0 ? (section) => {this.section = section} : null

        return (
          <Section 
            section={section}
            key={i} 
            id={id} 
            ref={ref}
          />
        )
      })
      : (<SectionDefault />)

    return (
      <div>
        <table className="Section-List">
          {sectionsDOM}
        </table>
      </div>
    )
  }
}

export default SectionList