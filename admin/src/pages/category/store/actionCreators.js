import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { SET_CATEGORY,GET_CATEGORY,UPDATE_CATEGORY,UPDATE_CATEGORY_ORDER } from 'api'


const  add_start=()=>{
        return {
                type:types.CATEGORY_ADD
        }
}
 const add_done=()=>{
        return{
                type:types.CATEGORY_DONE
        }
}
const set_AddCategories=(payload)=>{
    	return{
    		type:types.SET_ADD_CATEGORIES,
    		payload
    	}
}

const  getPage_start=()=>{
     return {
          type:types.GETPAGE_START
     }
}
const getPage_done=()=>{
     return{
          type:types.GETPAGE_DONE
     }
}
 const setPageAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_PAGE,
          payload
     }
}
export const addCategoryAction=(values)=>{
	return (dispatch)=>{
        dispatch(add_start())
        request({
        	method:'post',
        	data:values,
        	url:SET_CATEGORY,
        	withCredentials: true
        })
        .then((result)=>{
        	console.log('addCategory请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		if(result.data){
        			dispatch(set_AddCategories(result.data))
        		}
        		message.success('添加分类成功')
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
          dispatch(add_done())
        })
        .catch(e=>{
        	message.error('添加分类失败,网络错误，请稍后重试！');
          dispatch(add_done())
        })
    }
}

export const getAddCategoriesAction=()=>{
	return (dispatch)=>{
		 dispatch(getPage_start())
        request({
        	url:GET_CATEGORY,
        	data:{
        		pid:0
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getCate请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
                
        		dispatch(set_AddCategories(result.data))
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
           dispatch(getPage_done())
        })
        .catch(e=>{
          dispatch(getPage_done())
        	message.error('getadd网络错误，请稍后重试！');
        })
    }
}

export const getPagesAction=(pid,page)=>{
	return (dispatch)=>{
		// console.log('pid:::',pid)
        dispatch(getPage_start())
        request({
        	url:GET_CATEGORY,
        	data:{
        		pid: pid,
        		page:page
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getCatePage请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(setPageAction(result.data))
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
            dispatch(getPage_done())
        })
        .catch(e=>{
          dispatch(getPage_done())
        	message.error('网络错误，请稍后重试！');
        })
    }
}

export const showModalAction=(id,pid,name)=>{
    return {
        type:types.SHOW_MODAL,
        payload:{
            id:id,
            pid:pid,
            name:name
        }
    }
}
export const hideModalAction=()=>{
    return {
        type:types.HIDE_MODAL
    }
}
export const setInputPidValueAction=(payload)=>{
    return {
        type:types.SET_INPUT_PID,
        payload
    }
}
export const setInputNameValueAction=(payload)=>{
    return {
        type:types.SET_INPUT_NAME,
        payload
    }
}
export const update_start=()=>{
    return {
        type:types.UPDATE_START
    }
}
export const update_done=()=>{
    return {
        type:types.UPDATE_DONE
    }
}
export const updateCategoryAction=(id,updatePid,updateName)=>{
    return (dispatch,getState)=>{          //getState是此函数可以携带的参数，和dispatch一样
    		const state=getState().get('category');	//通过getState可以从store中获得最新的state数据
        dispatch(update_start())												//所以必须数据在state中才可以用getState
        request({
            method:'put',              //update操作用put方法
            url:UPDATE_CATEGORY,
            data:{
                id:id,
                pid: updatePid,
                name:updateName,
                page:state.get('current')
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('updateCategory请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                // dispatch(getPagesAction(updatePid,1))淘汰此方法是因为它还要再向服务器发送一次请求
                dispatch(setPageAction(result.data))  //不过用这个方法，是建立在服务器对应请求接着操作categoryModel.find的基础上
                dispatch(hideModalAction())
            }
            else if(result.code==1){
                message.error(result.errMessage)
            }
            dispatch(update_done())
        })
        .catch(e=>{
            dispatch(update_done())
            message.error('网络错误，请稍后重试！');
        })
    }
}
export const updateInputOrderAction=(pid,id,newOrder)=>{
    return (dispatch,getState)=>{          
    		const state=getState().get('category')
        dispatch(update_start())
        request({
            method:'put',              
            url:UPDATE_CATEGORY_ORDER,
            data:{
                id:id,
                pid: pid,
                newOrder:newOrder,
                page:state.get('current')
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('updateOrder请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                dispatch(setPageAction(result.data))
            }
            else if(result.code==1){
                message.error(result.errMessage)
            }
            dispatch(update_done())
        })
        .catch(e=>{
            dispatch(update_done())
            message.error('网络错误，请稍后重试！');
        })
    }
}