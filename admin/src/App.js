import React,{ Component } from 'react';

import './App.css'

import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Product from 'pages/product'
import Order from 'pages/order'

import Errorpage  from 'common/error-page'

import { getUserName } from 'util'


class App extends Component{
	render(){//自定义的放在render里，return外边
		const ProductedRoute=({component:Component,...rest})=>(
				<Route
					{...rest}
					render={(props)=>(
						getUserName()
						?<Component {...props} />
						:<Redirect to='/login' />//没有获取到登陆信息则跳转登录页面
					)}
				/>
			)
		const LoginRoute=({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(
					getUserName()
					?<Redirect to='/' />
					:<Component {...props} />
				)}
			/>
		)
		return(//Switch作用在于只要匹配到其中一个路由就不会再往下执行
			<Router forceRefresh={true}>
				<div className='App'>
					<Switch>
						<ProductedRoute exact path='/' component={ Home }  />
						<ProductedRoute path='/user' component={ User }  />
						<ProductedRoute path='/category' component={ Category }  />
						<ProductedRoute path='/product' component={ Product }  />
						<ProductedRoute path='/order' component={ Order }  />
						<LoginRoute path='/login' component={ Login } />
						<Route  component={ Errorpage } />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;