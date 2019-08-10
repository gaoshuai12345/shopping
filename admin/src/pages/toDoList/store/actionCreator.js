

import * as types from './actionTypes.js'//调用都用types.xx
import axios from 'axios'


export const changeValueAction=(payload)=>{
	return {
		type:types.CHANGE_VALUE,
		payload
	}
}
export const addItemAction=()=>{
	return {
		type:types.ADD_ITEM,
	}
}
export const deleteItemAction=(index)=>{
	return {
		type:types.DELETE_ITEM,
		index
	}
}
export const loadDataAction=(payload)=>{
	return {
		type:types.LOAD_DATA,
		payload
	}
}
export const getInitDataAction=()=>{
	return (dispatch)=>{
		axios.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action=loadDataAction(data.data)
			dispatch(action);
		})
		.catch(e=>{
			console.log(e)
		})
	}
}