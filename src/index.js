// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import configureStore from './store'
// import Routes from './routes'
// import './styles/global-styles.scss'
// import registerServiceWorker from './utils/registerServiceWorker'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui'
// //this will support below methods on all browsers
// // import 'core-js/fn/array/find'
// // import 'core-js/fn/array/find-index'
// // import 'core-js/fn/number/is-nan'
// import * as serviceWorker from './serviceWorker';
// const theme = createMuiTheme({
//   overrides: {
//     // Name of the component ⚛️ / style sheet
//     MuiSelect: {
//       select: {
//         '&:focus': {
//           background: 'none',
//         },
//       },
//     },
//   },
//   palette: {
//     primary: {
//       //  main: '#2E92FA', //Primary acent color as per ABB Guidelines
//       main: 'rgb(59, 190, 255)',
//     },
//     error: {
//       main: '#F03040', //Alarm color as per ABB Guidelines
//     },
//   },
//   typography: {
//     htmlfontSize: 12,
//     fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
//     fontSize: 18,
//     useNextVariants: true,
//   },
// })
// render(
//   <Provider store={configureStore()}>
//     <MuiThemeProvider theme={theme}>
//       <V0MuiThemeProvider>
//         <Routes />
//       </V0MuiThemeProvider>
//     </MuiThemeProvider>,
//   </Provider>,
//   document.getElementById('root')
// )
// serviceWorker.register();



import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Routes from './routes'
import './styles/global-styles.scss'
import registerServiceWorker from './utils/registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui'
//this will support below methods on all browsers
// import 'core-js/fn/array/find'
// import 'core-js/fn/array/find-index'
// import 'core-js/fn/number/is-nan'

 import * as serviceWorker from './serviceWorker';
const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiSelect: {
      select: {
        '&:focus': {
          background: 'none',
        },
      },
    },
  },
  palette: {
    primary: {
      //  main: '#2E92FA', //Primary acent color as per ABB Guidelines
      main: 'rgb(59, 190, 255)',
    },
    error: {
      main: '#F03040', //Alarm color as per ABB Guidelines
    },
  },
  typography: {
    htmlfontSize: 12,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 18,
    useNextVariants: true,
  },
})
render(
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider>
        <Routes />
      </V0MuiThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register();