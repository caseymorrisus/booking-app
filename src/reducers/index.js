import M from 'moment'
import {bookings} from '../data/bookings'
import {List, Map} from 'immutable'

// removes bookings from previous days, should ideally be added on the backend and return correct (current) data to frontend
const currentBookings = bookings.filter(booking => {
  const yesterday = M().subtract(1, 'days')
  return M(booking.start).isAfter(yesterday)
})

const initialState = Map({
  bookings: List(currentBookings),
  date: null,
  month: M().month(),
  calendarOpen: false,
  searchOpen: false,
  searchQuery: '',
  showNowButton: false
})

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_MONTH':
      return state.set('month', action.month)
    case 'CHANGE_DATE':
      return state.set('date', action.date)
    case 'CHANGE_CALENDAR_STATE':
      return state.set('calendarOpen', !state.get('calendarOpen'))
    case 'CHANGE_SEARCH_STATE':
      return state.set('searchOpen', !state.get('searchOpen'))
    case 'CHANGE_SEARCH_QUERY':
      return state.set('searchQuery', action.query)
    case 'ADD_BOOKING':
      const bookings = state.get('bookings').push(action.booking)
      return state.set('bookings', bookings)
    default: return state
  }
}