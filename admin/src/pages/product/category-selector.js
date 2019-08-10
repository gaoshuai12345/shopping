import React,{Component} from 'react'
import { Select } from 'antd';
const Option = Select.Option;
import { request } from 'util'
import {GET_CATEGORY} from 'api'


class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state={
			levelOneCategory:[],
			levelOneCategoryId:'',
			levelTwoCategory:[],
			levelTwoCategoryId:'',
			needLoadLevelTwo:false, 
			isChanged:false                    //作用于编辑商品时手动改变所属分类可以正常显示
		}
		this.handleLevelOneCategory=this.handleLevelOneCategory.bind(this)
		this.handleLevelTwoCategory=this.handleLevelTwoCategory.bind(this)
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange=this.handleLevelTwoChange.bind(this)
	}
	static getDerivedStateFromProps(props, state){//return的对象会与this.state合并，返回nullz则不会改变state
		// console.log('props:::::',props)
		// console.log('state:::::',state)
		/*  判断props是否发生变化，变量是布尔类型   */
		const levelOneCategoryIdChanged=props.parentCategoryId!==state.levelOneCategoryId;
		const levelTwoCategoryIdChanged=props.categoryId!==state.levelTwoCategoryId;
		

		//解决新建商品时第一次点击选择所属分类时无效的问题(第一次点击，使state里有了levelOneCattegoryId,但此时的props里任何数据都没有，所以会执行下边更新state,导致state里原有的levelOneId置空，所以该显示的分类名就没有)
		if(state.levelOneCategoryId && !props.parentCategoryId && !props.categoryId){
			return null
		}
		//分类Id没有变化 则不更新state
		if(!levelOneCategoryIdChanged && !levelTwoCategoryIdChanged){
			return null
		}
		if(state.isChanged){//props里的值是固定的，由前端传进来，所以下边代码只能执行一次，否则一直更新state,改变不了所属分类
			return null;
		}
		if(props.parentCategoryId==0){  //返回的值就会更新state中对应的值，input框内value=state中的值
			return{           
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:'',
				isChanged:true      //改为true后，代码会被拦截，下次不会在执行了，
			}
		}else{
			return{
				levelOneCategoryId:props.parentCategoryId,
				levelTwoCategoryId:props.categoryId,
				needLoadLevelTwo:true,
				isChanged:true          //改为true后，代码会被拦截，下次不会在执行了
			}
		}
		return null

	}
	componentDidMount(){
		this.handleLevelOneCategory()
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.handleLevelTwoCategory();
			this.setState({                  //只需要执行一次,props再怎么发生变化也不需要执行了，所以执行后将值变为false
				needLoadLevelTwo:false
			})
		}
		
	}
	handleLevelOneCategory(){//初始化页面获取分类
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState({
					levelOneCategory:result.data,
				})
			}
		})
	}
	handleLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState({
					levelTwoCategory:result.data,
				})
			}
		})
	}
	handleLevelOneChange(value){//触发一级分类change事件，获取对应子分类，value是antd封装的参数，表示对应option的value或key值
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategory:[],
			levelTwoCategoryId:''
		},()=>{
			this.handleLevelTwoCategory()
			this.onChangeId()                //调用函数向父组件传递参数Id
		}) 
	}
	handleLevelTwoChange(value){//传递id，主要是为了父组件到时提交时有对应的id,在此组件并无用处
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onChangeId()               //调用函数向父组件传递参数Id
		})
	}
	onChangeId(){
		const {levelOneCategoryId,levelTwoCategoryId}=this.state;
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}
		else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
	}
	render(){                 //简化调用this.state中的值
		 const { levelOneCategory,levelOneCategoryId,levelTwoCategory,levelTwoCategoryId } = this.state
		 const levelOneOptions = levelOneCategory.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
   		 const levelTwoOptions = levelTwoCategory.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		return(
			<div>
		        <Select 
		        style={{ width: 300,marginRight:10 }} 
		        defaultValue={levelOneCategoryId}
		        value={levelOneCategoryId}
		        onChange={this.handleLevelOneChange}
		        disabled={this.props.disabled}
		        >
		          {levelOneOptions}
		        </Select>
		        {		//如果二级分类有数据则显示select框，否则不显示
		        	levelTwoCategory.length
		        	? <Select 
				        defaultValue={levelTwoCategoryId}//切换一级菜单时，触发change函数，将levelTwoCategoryId置空，可以使此处原来的值消失
				        value={levelTwoCategoryId}  //当选择二级菜单时，触发change函数，可以使此处显示对应分类
				        style={{ width: 300 }} 
				        onChange={this.handleLevelTwoChange}
				       	disabled={this.props.disabled}
				        >
				          {levelTwoOptions}
				       </Select>
				     :null
		        }
		       
		    </div>
		)
	}
}

export default CategorySelector;