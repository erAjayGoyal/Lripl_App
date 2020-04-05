import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

export default function configureStore(initialState = {}) {
  const _middlewares = [ReduxThunk]
  const _enhancers = [
    applyMiddleware(..._middlewares),
    // other store _enhancers if there are any
  ]
  const _composeEnhancers = composeWithDevTools({
    // other compose _enhancers if there are any
    // Specify other options here if needed
  })
  const store = createStore(
    rootReducer,
    initialState,
    _composeEnhancers(..._enhancers)
  )
  if (module.hot) {
    // For reducers enable Webpack hot module replacement
    module.hot.accept('../reducers', () => {
      // eslint-disable-line global-require
      const _nextReducer = require('../reducers').default
      store.replaceReducer(_nextReducer)
    })
  }

  return store
}
