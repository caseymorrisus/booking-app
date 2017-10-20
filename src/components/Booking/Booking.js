import React, {Component} from 'react'
import moment from 'moment'
import './Booking.css'

class Booking extends Component {
  constructor(props) {
    super(props)
    this.createDurationString = this.createDurationString.bind(this)
  }

  createDurationString(durationObj) {
    const durations = [
      {key: 'days', str: 'd '}, 
      {key: 'hours', str: 'h '}, 
      {key: 'minutes', str: 'm'}
    ]

    const reduction = (acc, x) => {
      const curr = durationObj._data[x.key]
      return curr ? acc + curr + x.str : acc  
    }

    return durations.reduce(reduction, '')
  }

  render() {
    const {eventName, roomName, start, end} = this.props.booking
    const durationObj = moment.duration(moment(end).diff(start))
    const duration = this.createDurationString(durationObj)

    return (
      <tr className="booking">
        <td>
          <div>{moment(start).format('H:mm A')}</div>
          <div>{moment(end).format('H:mm A')}</div>
          <div>{duration}</div>
        </td>
        <td>
          <div>{eventName}</div>
          <div>{roomName}</div>
        </td>
      </tr>
    )
  }
}

export default Booking