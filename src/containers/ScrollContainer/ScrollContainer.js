import React, {Component} from 'react'
import M from 'moment'
import DatePickerContainer from '../DatePickerContainer'
import SectionListContainer from '../SectionListContainer'

class ScrollContainer extends Component {
  constructor(props) {
    super(props)
    this.scrollTo = this.scrollTo.bind(this)
  }

  scrollTo(date) {
    const scrollTo = M(date).startOf('day').valueOf()
    document.getElementById(scrollTo).scrollIntoView()
  }

  render() {
    return(
      <div className="scroll-container">
        <DatePickerContainer scrollTo={this.scrollTo}/>
        <SectionListContainer />
      </div>
    )
  }
}

export default ScrollContainer