

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	isAddFetching:false,
	categories:[],
	isPageFetching:false,               
	current:1,
	defaultCurrent:1,
	pageSize:10,
	total:200,
	list:[]	,
	modal:false,
	updateName:'',
	updatePid:'',
	id:'',
	confirmLoading:false
})
export default (state=defaultState,action)=>{
	if(action.type==types.CATEGORY_ADD){
		return state.set('isAddFetching',true)
	}
	if(action.type==types.CATEGORY_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type==types.SET_ADD_CATEGORIES){
		return state.set('categories',fromJS(action.payload))
	}

	if(action.type==types.GETPAGE_START){
		return state.set('isPageFetching',true)
	}
	if(action.type==types.GETPAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type==types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)//将数组转换为immutable对象给list
		})
	}

	if(action.type==types.SHOW_MODAL){
		return state.merge({
			modal:true,
			id:action.payload.id,
			updatePid:action.payload.pid,
			updateName:action.payload.name
		})
	}

	if(action.type==types.UPDATE_START){
		return state.set('confirmLoading',true)
	}
	if(action.type==types.UPDATE_DONE){
		return state.set('confirmLoading',false)
	}

	if(action.type==types.HIDE_MODAL){
		return state.set('modal',false)
	}
	if(action.type==types.SET_INPUT_PID){
		return state.set('updatePid',action.payload)
	}
	if(action.type==types.SET_INPUT_NAME){
		return state.set('updateName',action.payload)
	}

	return state
}