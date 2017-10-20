import React, {Component} from 'react'
import {connect} from 'react-redux'
import M from 'moment'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog'
import DateTimePicker from 'material-ui-datetimepicker'
import './AddBooking.css'

class AddBooking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogOpen: false,
      roomName: null,
      roomNameError: null,
      eventName: null,
      eventNameError: null,
      start: null,
      startError: null,
      end: null,
      endError: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleRoomChange = this.handleRoomChange.bind(this)
    this.handleEventChange = this.handleEventChange.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
    this.disableStartDates = this.disableStartDates.bind(this)
    this.disableEndDates = this.disableEndDates.bind(this)
  }

  getNewBookingId(bookings) {
    return bookings.map(booking => booking.id).sort((a, b) => b - a)[0] + 1
  }

  handleClick() {
    this.setState({dialogOpen: true})
  }

  handleEventChange(event, eventName) {
    this.setState({eventName})
  }

  handleRoomChange(event, roomName) {
    this.setState({roomName})
  }

  handleStartChange(date) {
    if (date) {
      this.handleDate(date.toISOString(), 'start')
    }
  }

  handleEndChange(date) {
    if (date) {
      this.handleDate(date.toISOString(), 'end')
    }
  }

  handleDate(date, key) {
    this.setState({[key]: date})
  }

  handleSubmit() {
    const {eventName, roomName, start, end} = this.state

    this.handleErrors(() => {
      this.props.handleCreate({
        id: this.getNewBookingId(this.props.bookings),
        eventName,
        roomName,
        start,
        end
      })

      this.resetForm(true)
    })
  }

  handleCancel() {
    this.resetForm(true)
  }

  handleErrors(onSuccess) {
    const fields = ['eventName', 'roomName', 'start', 'end']
    let hasError = false

    const update = fields.reduce((acc, field) => {
      if (!this.state[field]) {
        hasError = true
        acc[`${field}Error`] = 'Required'
      }
      return acc
    }, {})

    if (hasError) {
      this.setState(update)
    } else {
      onSuccess()
    }
  }

  resetForm(closeDialog) {
    const update = {
      roomName: null,
      roomNameError: null,
      eventName: null,
      eventNameError: null,
      start: null,
      startError: null,
      end: null,
      endError: null  
    }

    if (closeDialog) {
      update.dialogOpen = false
    }

    this.setState(update)
  }

  disableStartDates(date) {
    if (this.state.end) {
      return M(date).isAfter(this.state.End)
    } else {
      return !M(date).isAfter(M().subtract('1', 'days'))
    }
  }

  disableEndDates(date) {
    if (this.state.start) {
      return M(date).add('1', 'days').isBefore(this.state.start)
    } else {
      return !M(date).isAfter(M().subtract('1', 'days'))
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ]

    const addBooking = !this.props.searchOpen
      ? (<span className="add-booking">
          <i className="fa fa-plus" aria-hidden="true" onClick={this.handleClick}></i>
          <Dialog 
            open={this.state.dialogOpen}
            actions={actions}
          >
            <h3>Create Booking</h3>
            <TextField
              floatingLabelFixed
              floatingLabelText="Event Name"
              onChange={this.handleEventChange}
              fullWidth={true}
              errorText={this.state.eventNameError}
            /><br/>
            <TextField
              floatingLabelFixed
              floatingLabelText="Room Name"
              onChange={this.handleRoomChange}
              fullWidth={true}
              errorText={this.state.roomNameError}
            /><br/>
            <DateTimePicker
              floatingLabelFixed
              floatingLabelText="Start Date"
              className='date-time-container'
              textFieldClassName='date-time-input'
              onChange={this.handleStartChange}
              DatePicker={DatePickerDialog}
              TimePicker={TimePickerDialog}
              returnMomentDate={true}
              fullWidth={true}
              errorText={this.state.startError}
              shouldDisableDate={this.disableStartDates}
            /><br/>
            <DateTimePicker
              floatingLabelFixed
              floatingLabelText="End Date"
              className='date-time-container'
              textFieldClassName='date-time-input'
              onChange={this.handleEndChange}
              DatePicker={DatePickerDialog}
              TimePicker={TimePickerDialog}
              returnMomentDate={true}
              fullWidth={true}
              errorText={this.state.endError}
              shouldDisableDate={this.disableEndDates}
            /><br/>
          </Dialog>
        </span>)
      : null

    return addBooking
  }
}

const mapStateToProps = state => ({
  searchOpen: state.get('searchOpen'),
  bookings: state.get('bookings')
})

const mapDispatchToProps = dispatch => ({
  handleCreate: booking => {
    dispatch({type: 'ADD_BOOKING', booking})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBooking)