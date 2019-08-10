import React,{Component} from 'react';
import Simditor from 'simditor'

import 'simditor/styles/simditor.css'
import $ from 'jquery' 


class RichEditor extends Component{
	constructor(props){
		super(props);
		this.state={
			isLoaded:false
		}
		this.toolbar=[
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol', 
			  'ul', 
			  'blockquote',
			  'code',
			  'table',
			  'link',
			  'image',
			  'hr',
			  'indent',
			  'outdent',
			  'alignment'
			]
		$.ajaxSetup({                //simditor并没有封装withCredentials:true的接口，所以需要用ajax全局配置
			xhrFields:{
				withCredentials:true
			}
		})
	}
	componentDidMount(){
		this.editor=new Simditor({                 
		  textarea:this.textarea,
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		    fileKey: 'upload_'      // 文件参数的关键;
		  }
		});
		this.editor.on('valuechanged',()=>{
			this.setState({                    //change发生，会改变props,
				isLoaded:true
			},()=>{
				this.props.getRichEditorValue(this.editor.getValue())
			})
		})
	}
	componentDidUpdate(){   //新建商品时写富文本剪辑器不应该走进这个代码，所以在change事件要加一个setState函数，改变isLoaded条件,具体看change事件
		//为什么写在这个生命周期函数里边
		/*
			父组件执行constructor后，紧接着子组件会执行constructor和DidMount,
			父组件再执行Didmount,这时就有了props的变化，然后子组件的DidUpdate函数就会执行
			如果这些代码写在constructor里边，就不可能再次执行了
		*/
		if(this.props.detail && !this.state.isLoaded){
			this.editor.setValue(this.props.detail)//不写条件的话，因为valuechanged事件，光标会一直移动到首字符位置
			this.setState({
				isLoaded:true
			})
		}
	}
	render(){
		return(          //ref用来选择DOM节点
			<textarea ref={(textarea)=>{this.textarea=textarea}}></textarea>
		)
	}

}


export default RichEditor