import React,{ Component } from 'react'
import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

import OrderDetail from './detail.js'
import OrderList from './list.js'

class Product extends Component{
	render(){
		return(
			<div>
				<Switch>
					<Route  path='/order/detail/:orderNo' component={ OrderDetail } />
					<Route  path='/order' component={ OrderList } />
				</Switch>
			</div>
		)
	}

}
export default Product;