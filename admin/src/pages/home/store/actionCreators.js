import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { ADMIN_COUNT } from 'api'

export const setCountAction=(payload)=>{
   return {
      type:types.SET_COUNT,
      payload
    }
}

export const getCountAction=()=>{
	return (dispatch)=>{
        request({
        	url:ADMIN_COUNT
        })
        .then((data)=>{
        	console.log('home请求count成功后返回到前端的数据：：',data)
        	if(data.code==0){
        	   dispatch(setCountAction(data.data))
          }
        	else if(data.code==1){
        		message.error(data.errMessage)
        	}
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
        })
      }
}