import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { 
    GET_ORDER,
    ORDER_DETAIL,
    SEARCH_ORDER,
    CHANGE_ORDER_STATUS
} from 'api'


const  getPage_start=()=>{
     return {
          type:types.GET_PAGE_START
     }
}
const getPage_done=()=>{
     return{
          type:types.GET_PAGE_DONE
     }
}
const setPageAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_PAGE,
          payload
     }
}

export const getPagesAction=(page)=>{
	return (dispatch)=>{
        dispatch(getPage_start())
        request({
        	url:GET_ORDER,
        	data:{
        		page:page
        	},
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((result)=>{
        	console.log('getOrderPage请求成功后返回到前端的数据：：',result)
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

const setOrderDetailAction=(payload)=>{
    return {
        type:types.SET_ORDER_DETAIL,
        payload
    }
}
export const getOrderDetail=(orderNo)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:ORDER_DETAIL,
            data:{
                orderNo:orderNo,
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('OrderDetail请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                 dispatch(setOrderDetailAction(result.data))
            }
            else if(result.code==1){
                message.error(result.errMessage)
               
            }
        })
        .catch(e=>{
            message.error('网络错误，请稍后重试！');
        })
    }
}
export const searchOrderAction=(keyword,page=1)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:SEARCH_ORDER,
            data:{
                keyword,
                page
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('searchOrder请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                dispatch(setPageAction(result.data))
            }
            else if(result.code==1){
                message.error(result.errMessage)
            }
        })
        .catch(e=>{
            message.error('网络错误，请稍后重试！');
        })
    }
}
export const changeOrderStatus=(orderNo)=>{
    return (dispatch)=>{          
        request({
            method:'put',              
            url:CHANGE_ORDER_STATUS,
            data:{
                orderNo:orderNo,
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('CHANGE_ORDER_STATUS请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                 dispatch(setOrderDetailAction(result.data))
            }
            else if(result.code==1){
                message.error(result.errMessage)
               
            }
        })
        .catch(e=>{
            message.error('网络错误，请稍后重试！');
        })
    }
}