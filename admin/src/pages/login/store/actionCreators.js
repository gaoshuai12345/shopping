import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request,setUserName } from 'util'//配置别名
import { SERVER_LOGIN } from 'api'


export const  login_start=()=>{
	return {
		type:types.LOGIN_START
	}
}
export const login_done=()=>{
	return{
		type:types.LOGIN_DONE
	}
}
export const getLoginAction=(values)=>{//values是ant-design封装的接收username和pwd的
	return (dispatch)=>{
		dispatch(login_start())
        request({
        	method:'post',
        	data:values,
        	url:SERVER_LOGIN,
        	withCredentials: true//axios默认不会将session的userInfo存储到req上
        })
        .then((data)=>{
        	console.log('请求成功后返回到前端的数据：：',data)
        	if(data.code==0){
        		setUserName(data.data.username)
        		window.location.href='/'
        	}
        	else if(data.code==1){
        		message.error(data.errMessage)
        	}
        	dispatch(login_done())
        })
        .catch(e=>{
        	message.error('网络错误，请稍后重试！');
        	/*
        	this.setState({
	        	isFetching:false
	        })
	        */
	        dispatch(login_done())
        })
	}
}