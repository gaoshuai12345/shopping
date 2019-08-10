

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	isPageFetching:false,               
	current:1,
	defaultCurrent:1,
	pageSize:10,
	total:200,
	list:[]	,
	confirmLoading:false,

	keyword:'',
	orderDetail:{}
})
export default (state=defaultState,action)=>{

	if(action.type==types.GET_PAGE_START){
		return state.set('isPageFetching',true)
	}
	if(action.type==types.GET_PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type==types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list),//将数组转换为immutable对象给list
			keyword:action.payload.keyword//后来添加，为了点击某一页时区分是所有商品分页还是搜索商品分页
		})
	}
	if(action.type==types.SET_ORDER_DETAIL){
		return state.set('orderDetail',action.payload)
	}
	return state
}