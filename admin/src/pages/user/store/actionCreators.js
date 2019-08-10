import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { GET_USER } from 'api'



export const  getUser_start=()=>{
     return {
          type:types.GETUSER_START
     }
}
export const getUser_done=()=>{
     return{
          type:types.GETUSER_DONE
     }
}
export const setUsersDataAction=(payload)=>{
    return /*const action=*/{    //注意写法
          type:types.SET_USER_DATA,
          payload
     }
}

export const getUsersAction=(page)=>{
	return (dispatch)=>{
          dispatch(getUser_start())
          request({
               method:'get',
          	url:GET_USER,
               data:{
                    page:page
               }
          })
          .then((result)=>{
          	console.log('user请求成功后返回到前端的数据：：',result)
          	if(result.code==0){
                    let data=result.data;
          		dispatch(setUsersDataAction(data))
          	}
          	else{
          		message.error(data.errMessage)
          	}
               dispatch(getUser_done())
          })
          .catch((e)=>{
               dispatch(getUser_done())
               console.log('user-catch::',e)
          	message.error('网络错误，请稍后重试！');
               
          })
    }
}
