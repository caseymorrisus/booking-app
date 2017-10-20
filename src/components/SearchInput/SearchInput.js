import React, {Component} from 'react'
import {connect} from 'react-redux'
import './SearchInput.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.escFunction = this.escFunction.bind(this)
  }

  componentDidMount() {
    this.searchInput.focus()
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.props.closeSearch()
      this.props.handleChange({target: {value: ''}})
    }
  }

  render() {
    return(
      <input 
        className="search-input"
        type="text"
        placeholder="Search by name/room"
        value={this.props.searchQuery}
        onChange={this.props.handleChange}
        ref={(input) => {this.searchInput = input}}
      />
    )
  }
}

const mapStateToProps = state => ({
  searchQuery: state.get('searchQuery')
})

const mapDispatchToProps = dispatch => ({
  closeSearch: () => {
    dispatch({type: 'CHANGE_SEARCH_STATE'}) 
  },
  handleChange: event => {
    dispatch({type: 'CHANGE_SEARCH_QUERY', query: event.target.value})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput)