

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	isFetching:false
})
export default (state=defaultState,action)=>{
	if(action.type==types.LOGIN_START){
		return state.set('isFetching',true)
	}
	if(action.type==types.LOGIN_DONE){
		return state.set('isFetching',false)
	}
	return state
}