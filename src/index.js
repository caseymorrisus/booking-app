import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import './font-awesome/css/font-awesome.min.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import bookings from './reducers'

let store = createStore(bookings)

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
