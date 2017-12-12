import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { blue } from 'material-ui/colors'
import App from './App'
import { reducer } from './store/redux'
import wrapComponent from './util/utils'

const root = document.getElementById('root')
// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__ // eslint-disable-line
// 使用初始 state 创建 Redux store
const store = createStore(reducer, preloadedState)

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: blue, // Purple and green play nicely together.
  },
});

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(wrapComponent(App))

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // console.log('hot loader refresh') // eslint-disable-line
    const NextApp = require('./App.js').default // eslint-disable-line
    render(wrapComponent(NextApp))
  })
}
