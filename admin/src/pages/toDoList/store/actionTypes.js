//为什么写这么一个js文件？
/*
	因为action的type值必须唯一，且组件间传递名称要正确，这样写一可以统一管理，二
如果哪处书写错误，浏览器可以提示错误，报错
*/
export const CHANGE_VALUE='change_value';

export const ADD_ITEM='add_item';
export const DELETE_ITEM='delete_item';
export const LOAD_DATA='load_data';