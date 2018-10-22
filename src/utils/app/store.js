import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../../js/state/reducers'

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk, logger)
    )
)

export default store
