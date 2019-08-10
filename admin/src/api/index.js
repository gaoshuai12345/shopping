   
                      //所有路由统一管理

const SERVER='http://127.0.0.1:3000'
export const SERVER_LOGIN = SERVER +'/admin/login'
export const ADMIN_COUNT = SERVER +'/admin/count'
export const USER_LOGOUT = SERVER +'/user/logout'
export const GET_USER = SERVER +'/admin/users'
export const SET_CATEGORY = SERVER +'/category'//这个时Post请求
export const UPDATE_CATEGORY = SERVER +'/category/edit'
export const UPDATE_CATEGORY_ORDER =SERVER +'/category/editOrder'
export const UPLOAD_PRODUCT_IMAGE =SERVER +'/product/uploadImage'
export const UPLOAD_PRODUCT_DETAIL_IMAGE =SERVER +'/product/uploadDetailImage'
export const SET_PRODUCT = SERVER +'/product'
export const GET_PRODUCT = SERVER +'/product'
export const PRODUCT_DETAIL = SERVER +'/product/detail'
export const GET_CATEGORY = SERVER +'/category'
export const UPDATE_PRODUCT_ORDER =SERVER +'/product/editOrder'
export const UPDATE_PRODUCT_STATUS =SERVER +'/product/editStatus'



//
export const GET_ORDER = SERVER +'/order'
export const SEARCH_ORDER =SERVER +'/order/search'
export const ORDER_DETAIL =SERVER +'/order/detail'
export const CHANGE_ORDER_STATUS =SERVER +'/order/changeStatus'