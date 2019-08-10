

import {fromJS} from 'immutable'
import * as types from './actionTypes.js'

const defaultState=fromJS({
	parentCategoryId:'',
	categoryId:'',
	imagePath:'',
	detailValue:'',
	categoryId_validateStatus:'',
	categoryId_help:'',
	images_validateStatus:'',
	images_help:'',

	isAddFetching:false,
	isPageFetching:false,               
	current:1,
	defaultCurrent:1,
	pageSize:10,
	total:200,
	list:[]	,
	id:'',
	confirmLoading:false,

	name:'',
	description:'',
	price:'',
	stock:'',

	keyword:''
})
export default (state=defaultState,action)=>{
	if(action.type==types.SET_CATEGORY_ID){           //添加商品的页面用到
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryId_validateStatus:'',            //后来添加，作用于选择所属分类校验成功
			categoryId_help:''                      //后来添加，作用于选择所属分类校验成功
		})
	}
	if(action.type==types.SET_IMAGE){
		return state.merge({
			'imagePath':action.payload,
			images_validateStatus:'',
			images_help:''	
	})
	}
	if(action.type==types.SET_EDITOR_VALUE){
		return state.set('detailValue',action.payload)
	}
	if(action.type==types.SET_CATEGORYID_ERROR){
		return state.merge({
			categoryId_validateStatus:'error',
			categoryId_help:'请选择所属分类'		
		})
	}
	if(action.type==types.SET_IMAGES_ERROR){
		return state.merge({
			images_validateStatus:'error',
			images_help:'请至少上传一张图片'		
		})
	}
	if(action.type==types.PRODUCT_ADD){
		return state.set('isAddFetching',true)
	}
	if(action.type==types.PRODUCT_DONE){
		return state.set('isAddFetching',false)
	}

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
	if(action.type==types.SET_PRODUCT_DETAIL){
		return state.merge({
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			parentCategoryId:action.payload.category.pid,
			categoryId:action.payload.category._id,
			imagePath:action.payload.imagePath,
			detailValue:action.payload.detail,

		})
	}



	return state
}