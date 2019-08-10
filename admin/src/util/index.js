                            //公共功能
import axios from 'axios'

export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		const params={
			method:options.method || 'get',
			url:options.url || '',
			withCredentials: true//axios默认不会将session的userInfo存储到req上
		}
		/*
			axios发送请求时如果需要传递数据，分为以下几种情况：
				（1）get请求和delete请求：数据传送格式
						params：数据值
				（2）post请求和put请求等：数据传送格式
						data:数据值
		*/
		switch(params.method.toLowerCase()){
			case 'get':
			case 'delete':
				params.params=options.data
				break;
			default :
			 	params.data=options.data
		}
		axios(params)
		.then((result)=>{
			const data=result.data;
			// console.log('util-result::',result)
			if(data.code==10){//返回10是因为未登录(另外也是为了防止直接在浏览器端设置localStorage进入首页，)
				removeUserName()
				window.location.href='/login'
				reject(data.message);
			}
			else{
				resolve(data)
			}
		})
		.catch(e=>{
			console.log('hah')
			reject(e)
		})
	})
}

export const setUserName=(username)=>{
      	window.localStorage.setItem('username',username)
}
export const getUserName=()=>{
     return window.localStorage.getItem('username')
}
export const removeUserName=()=>{
     window.localStorage.removeItem('username')
}