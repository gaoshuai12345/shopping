const path=require('path');//不需要 npm install path,在node环境中有path
const HtmlWebpackPlugin = require('html-webpack-plugin');//加载html页面所需模块
const CleanWebpackPlugin = require('clean-webpack-plugin');//清理dist文件夹中多余的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath ='/';

//生成HtmlWebpackPlugin配置
const getHtmlConfig=(jsName,title)=>({
	template:'./src/view/'+jsName+'.html',  //因为这里的路径，所以jsName必须命名是对应文件夹名字
	filename:jsName+'.html',
	// inject:'head'，index.html的script文件引入位置在head里
	title:title,
	inject:true,//默认，index.html的script文件引入位置在body里所有Dom元素后
	hash:true,//--生成随机字符串    默认是false

	chunks:['common',jsName]//使生成的html页面只引用相应的js文件
})

module.exports={

	mode:'development',//开发环境
	// mode:'production'//线上环境

	//多入口文件
	entry:{
		common:'./src/pages/common/index.js',
		index:'./src/pages/index/index.js',
		list:'./src/pages/list/index.js',
		detail:'./src/pages/detail/index.js',
		cart:'./src/pages/cart/index.js',
		'order-confirm':'./src/pages/order-confirm/index.js',
		'order-list':'./src/pages/order-list/index.js',
		'order-detail':'./src/pages/order-detail/index.js',
		'payment':'./src/pages/payment/index.js',
		'user-login':'./src/pages/user-login/index.js',
		'user-register':'./src/pages/user-register/index.js',
		'user-center':'./src/pages/user-center/index.js',
		'user-update-password':'./src/pages/user-update-password/index.js',
		'result':'./src/pages/result/index.js'
	},

	//配置额外模板 配置后可以在页面var $$=require('jquery')来使用jquery,不过此方法并不常用
	externals:{
		'jquery':'window.jQuery'
	},

	output:{//导出文件命名
		//如果多个入口文件，要导出多个出口文件，那么filename命名需要加上[name ]
		filename:'js/[name].js',
		publicPath:publicPath,//影响到打包时生成的bundle.js路径，加‘/’使请求地址从根(域名)开始拼凑，不加‘/’地址会在当前地址基础上拼凑
		//导出路径
		path:path.resolve(__dirname,'dist')
	},
	resolve:{//配置别名
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			images:path.resolve(__dirname,'./src/images'),
			node_modules:path.resolve(__dirname,'./node_modules'),
			util:path.resolve(__dirname,'./src/util'),
			service:path.resolve(__dirname,'./src/service'),
			common:path.resolve(__dirname,'./src/common'),
		}
	},
	module: {//loader部分
	    rules: 
	    	[
		      {//处理css文档的loader 
		      	test: /\.css$/,
		      	/* 
		      	use: [
			      	 	'style-loader' ,
			      		'css-loader'
		      	],
		      	用下面的可以单独打包css
		      	*/
		       	use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {

		            }
		          },
		          "css-loader"
		        ]
		      },
		      {//处理图片和字体图标                      正则问号->后边的可有可无
		         test: /\.(png|svg|jpg|gif|ttf|woff2|woff|svg|eot)\??.*$/,
		         use: [
		           // 'file-loader'
		           {
		           		loader:'file-loader',
		           		options:{
		           			limit:100,//小于100用base64格式保存图片(base64多用于保存字符串)
		           			name:'resource/[name].[ext]'
		           		}
		           }
		         ]
		       },
		       {
                	test:/\.js$/,
	                exclude: /(node_modules)/,//将node_modules中的js文件排除在外
	                use: {
	                    loader: 'babel-loader',
	                    options: {
	                        presets: ['env','es2015','stage-3']
	                    }
	                },

	            },
	            {
                	test:/\.tpl$/,//支持tpl结尾的html模板文件如index.tpl
	                use: {
	                    loader: 'html-loader',
	                },

	            }
	    ],
	   
  },
  plugins://处理html文档
 	 [
  		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
  		new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
  		new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
  		new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
  		new HtmlWebpackPlugin(getHtmlConfig('order-confirm','确认订单')),
  		new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
  		new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
  		new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
  		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
  		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
  		new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
  		new HtmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
  		new HtmlWebpackPlugin(getHtmlConfig('result'),'结果提示'),
  		new CleanWebpackPlugin(['dist']),
  		new MiniCssExtractPlugin({
  			filename:'css/[name].css' //将所有css文件打包在css文件夹下
  		})
  ],
  devServer:{ //用来提高效率的，更改样式等不需要每次去npx webpack也不需要刷新浏览器(会隐藏dist)
  	contentBase: './dist',
  	port:3002,  //端口号
  	proxy:{
  		"/user":{//接口是以什么开头的
	  		target:'http://127.0.0.1:3000',//代理哪个路由
	  		changeOrigin:true              //是否支持跨域
	  	},
	  	"/product":{
	  		target:'http://127.0.0.1:3000',
	  		changeOrigin:true              
	  	},
	  	"/cart":{
	  		target:'http://127.0.0.1:3000',
	  		changeOrigin:true              
	  	},
	  	"/shipping":{
	  		target:'http://127.0.0.1:3000',
	  		changeOrigin:true              
	  	},
	  	"/order":{
	  		target:'http://127.0.0.1:3000',
	  		changeOrigin:true              
	  	},
	  	"/payment":{
	  		target:'http://127.0.0.1:3000',
	  		changeOrigin:true              
	  	}
  	}
  }

}