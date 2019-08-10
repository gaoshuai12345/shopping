import { createStore,applyMiddleware  } from 'redux'
                   
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk';

import reducer from './reducer.js'

const logger = createLogger({});

const middleWare=[thunk]

if(process.env.NODE_ENV != 'production'){//开发状态
	middleWare.push(logger);
}
const store=createStore(reducer,applyMiddleware(...middleWare))

export default store;