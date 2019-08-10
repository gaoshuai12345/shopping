import React,{ Component } from 'react'
import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch,
} from 'react-router-dom'

import CategoryAdd from './add.js'
import CategoryList from './list.js'




class Category extends Component{
	render(){
		return(
			// <Router>不需要Router了，因为所有组件都包含在App.js中的Router里
			//路由后边加问号？，那么它临近的一个参数可有可无
				<div>
					<Switch>
						<Route  path='/category/add' component={CategoryAdd } />
						<Route  path='/category/:pid?' component={CategoryList } />
					</Switch>
				</div>
			// </Router>
		)
	}
}


export default Category;