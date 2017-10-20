import React, {Component} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker.css'
import M from 'moment'

M.updateLocale('en', {
  weekdaysMin : ["S", "M", "T", "W", "T", "F", "S"]
})

class DatePickerContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  handleChange(date) {
    this.props.handleDateChange(date)

    // check if month is different before dispatching
    if (M(date).month() !== this.props.month) {
      this.handleMonthChange(date)
    }
  }

  handleMonthChange(month, callback) {
    this.props.handleMonthDispatch(M(month).month())
  }

  componentDidUpdate(prevProps) {
    const {date, scrollTo} = this.props
    
    // check if date is different before scrolling
    if (date !== prevProps.date) {
      scrollTo(date)
    }
  }

  render() {
    const {bookings, calendarOpen, date} = this.props
    const dates = bookings.map(booking => M(booking.start))
    const className = calendarOpen && !this.props.searchOpen ? 'open' : ''

    return (
      <DatePicker
        inline
        selected={date}
        onChange={this.handleChange}
        onMonthChange={this.handleMonthChange}
        minDate={M()}
        calendarClassName={className}

        includeDates={dates.toArray()}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleDateChange: date => { 
    dispatch({type: 'CHANGE_DATE', date}) 
  },
  handleMonthDispatch: month => {
    dispatch({type: 'CHANGE_MONTH', month})
  }
})

const mapStateToProps = state => ({
  date: state.get('date'),
  bookings: state.get('bookings'),
  calendarOpen: state.get('calendarOpen'),
  searchOpen: state.get('searchOpen'),
  month: state.get('month')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePickerContainer)