import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchInput from '../SearchInput'
import './Search.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.handleClick()
    this.props.clearSearchQuery()
  }

  render() {
    const {searchOpen, handleClick} = this.props
    const className = searchOpen ? 'search-btn open' : 'search-btn'

    return(
      <div className={className}>
        {searchOpen && <SearchInput />}
        {searchOpen && <span onClick={this.handleClose}>Close</span>}
        {!searchOpen &&
          <i className="fa fa-search" aria-hidden="true" onClick={handleClick}></i>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchOpen: state.get('searchOpen')
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch({type: 'CHANGE_SEARCH_STATE'}) 
  },
  clearSearchQuery: () => {
    dispatch({type: 'CHANGE_SEARCH_QUERY', query: ''}) 
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)