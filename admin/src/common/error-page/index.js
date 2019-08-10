import React,{ Component } from 'react'
import { Alert } from 'antd';
import { Link } from 'react-router-dom'

import './index.css'

class ErrorPage extends Component{
	render(){
		return(
			<div className="errorPage">
				<Alert message="页面走丢了" type="error" />
				<Link to='/'>点击返回首页</Link>
			</div>
		)
	}
}


export default ErrorPage;