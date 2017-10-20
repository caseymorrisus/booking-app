import React, {Component} from 'react'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import M from 'moment'
import Search from '../../components/Search'
import AddBooking from '../../components/AddBooking'
import {titleStyle, iconStyleRight} from './AppBarStyles'

class AppBarContainer extends Component {
  render() {
    const {month, calendarOpen, handleTouch, searchOpen} = this.props
    const title = !searchOpen ? M(month + 1, 'MM').format('MMMM') : ""
    const className = calendarOpen ? "fa fa-angle-down" : "fa fa-angle-up"
    const iconElementRight = !searchOpen
      ? <i className={className} aria-hidden="true"></i>
      : null 
    
    return(
      <AppBar
        title={title}
        titleStyle={titleStyle}
        showMenuIconButton={false}
        onTitleTouchTap={handleTouch}
        onRightIconButtonTouchTap={handleTouch}
        iconElementRight={iconElementRight}
        iconStyleRight={iconStyleRight}
        zDepth={0}
      >
        <Search />
        <AddBooking />
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  month: state.get('month'),
  calendarOpen: state.get('calendarOpen'),
  searchOpen: state.get('searchOpen')
})

const mapDispatchToProps = dispatch => ({
  handleTouch: () => { 
    dispatch({type: 'CHANGE_CALENDAR_STATE'}) 
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarContainer)