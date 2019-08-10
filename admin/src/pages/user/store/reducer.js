

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({           //fromJS的JS全大写
	isFetching:true,                 //写布尔型
	current:1,
	defaultCurrent:1,
	pageSize:10,
	total:200,
	list:[]	
})
export default (state=defaultState,action)=>{
	if(action.type==types.GETUSER_START){
		return state.set('isFetching',true)
	}
	if(action.type==types.GETUSER_DONE){
		return state.set('isFetching',false)
	}
	if(action.type==types.SET_USER_DATA){
		// return state.set('userData',action.payload)
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)//将数组转换为immutable对象给list
		})
	}
	return state
}