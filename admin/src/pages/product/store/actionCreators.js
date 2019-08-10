import axios from 'axios'
import { message } from 'antd';
import * as types from './actionTypes.js'
import { request } from 'util'//配置别名
import { 
    SET_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT_ORDER,
    UPDATE_PRODUCT_STATUS,
    PRODUCT_DETAIL,
    SEARCH_PRODUCT
} from 'api'


export const getSetCategoryId=(parentCategoryId,categoryId)=>({
    type:types.SET_CATEGORY_ID,
    payload:{
        parentCategoryId,
        categoryId
    }
})
export const getSetImages=(filePath)=>({
    type:types.SET_IMAGE,
    payload:filePath
})
export const getSetEditorValue=(value)=>({
    type:types.SET_EDITOR_VALUE,
    payload:value
})



const  add_start=()=>{
        return {
                type:types.PRODUCT_ADD
        }
}
 const add_done=()=>{
        return{
                type:types.PRODUCT_DONE
        }
}


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
const setCategoryId_error=()=>{
    return {   
          type:types.SET_CATEGORYID_ERROR,
     }
}
const setImages_error=()=>{
    return {   
          type:types.SET_IMAGES_ERROR,
     }
}



export const saveProductAction=(err,values)=>{
	return (dispatch,getState)=>{
        const state=getState().get('product')
        const categoryId=state.get('categoryId')
        const images=state.get('imagePath')
        let hasError=false; //为了让点击提交后页面上的错误全部显示在页面上，所以不一有错误就return
        if(!categoryId){
            dispatch(setCategoryId_error())
            hasError=true
        }
        if(!images){
            dispatch(setImages_error())
            hasError=true
        }
        if(hasError){
            return;
        }
        if(err){
            return;
        }
        let method='post';
        if(values.id){
            method='put'
        }
        dispatch(add_start())
        request({
        	method:method,
        	data:{
                ...values,           //values从antd封装函数发送过来，只有这里需要的部分参数
                // parentCategoryId:state.get('parentCategoryId'),
                category:state.get('categoryId'),
                imagePath:state.get('imagePath'),
                detailValue:state.get('detailValue')
            },
        	url:SET_PRODUCT,
        	withCredentials: true
        })
        .then((result)=>{
        	console.log('saveProduct请求成功后返回到前端的数据：：',result)
        	if(result.code==0){
        		dispatch(setPageAction(result.data));
        		message.success(result.message)
                if(values.id){
                    // window.location.href='/product'
                }
        	}
        	else if(result.code==1){
        		message.error(result.errMessage)
        	}
          dispatch(add_done())
        })
        .catch(e=>{
        	message.error('添加商品失败,网络错误，请稍后重试！');
          dispatch(add_done())
        })
    }
}


export const getPagesAction=(page)=>{
	return (dispatch)=>{
		// console.log('pid:::',pid)
        dispatch(getPage_start())
        request({
        	url:GET_PRODUCT,
        	data:{
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


export const updateInputOrderAction=(id,newOrder)=>{
    return (dispatch,getState)=>{          
    	const state=getState().get('category')
        request({
            method:'put',              
            url:UPDATE_PRODUCT_ORDER,
            data:{
                id:id,
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
        })
        .catch(e=>{
            message.error('网络错误，请稍后重试！');
        })
    }
}
export const updateStatusAction=(id,newStatus)=>{
    return (dispatch,getState)=>{          
        const state=getState().get('category')
        request({
            method:'put',              
            url:UPDATE_PRODUCT_STATUS,
            data:{
                id:id,
                newStatus:newStatus,
                page:state.get('current')
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('updateStatus请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                 message.success('更改状态成功')
            }
            else if(result.code==1){
                message.error(result.errMessage)
                dispatch(setPageAction(result.data))//这里写在数据库返回失败的地方，因为
                                        //更改状态的开关在点击后就会变化，并不能说明是否
                                        //更改数据成功，写在这里则是若更改不成功，从新刷
                                        //新页面，那是开关会根据数据库的status值进行设置
                                        //这样便可以将开关状态设置在正确状态
            }
        })
        .catch(e=>{
            message.error('网络错误，请稍后重试！');
        })
    }
}
const setProductDetailAction=(payload)=>{
    return {
        type:types.SET_PRODUCT_DETAIL,
        payload
    }
}
export const getProductDetail=(productId)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:PRODUCT_DETAIL,
            data:{
                id:productId,
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('ProductDetail请求成功后返回到前端的数据：：',result)
            if(result.code==0){
                 dispatch(setProductDetailAction(result.data))
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
export const searchProductAction=(keyword,page=1)=>{
    return (dispatch)=>{          
        request({
            method:'get',              
            url:SEARCH_PRODUCT,
            data:{
                keyword,
                page
            },
            withCredentials: true
        })
        .then((result)=>{
            console.log('searchProduct请求成功后返回到前端的数据：：',result)
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