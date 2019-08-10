

import * as types from './actionTypes.js'
import {fromJS} from 'immutable'


const defaultState=fromJS({//将state数据变为Map类型
	value:'默认数据hello!!!',
	list:['aaa!!!','bbb!!!']
})

/*
		在reducer中是默认不允许修改state的，这里只是想state复制一份
		return返回到store，再由store更改的，所以为了防止一些错误的操作
		（如在此文件更改state）,给state数据加一个属性，引入了immutable对象
		
*/
export default (state=defaultState,action)=>{
	// console.log('1::',state)
	if(action.type==types.CHANGE_VALUE){
		/*
		//深copy
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;
		return newState;//函数里边return了就退出函数了
		*/
		return state.set('value',action.payload)
	}
	if(action.type==types.LOAD_DATA){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.list=action.payload;
		return newState;
		*/
		return state.set('list',action.payload)
	}
	if(action.type==types.ADD_ITEM){
		const newList=[...state.get('list'),state.get('value')];
		return state.merge({//因为还要将value设置为空，所以用merge
			list:newList,
			value:''
		})
	}
	if(action.type==types.DELETE_ITEM){
		const newList=[...state.get('list')];
		newList.splice(action.index,1);
		return state.set('list',newList)
	}
	return state
}