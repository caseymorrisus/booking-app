import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBarContainer from './containers/AppBarContainer'
import ScrollContainer from './containers/ScrollContainer'
import theme from './MuiTheme'
import './App.css';

const muiTheme = getMuiTheme(theme)

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    const {store} = this.props
    store.dispatch({type: 'CHANGE_DATE', payload: date})
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBarContainer />
          <ScrollContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
