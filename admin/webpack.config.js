const path=require('path');//不需要 npm install path,在node环境中有path
const HtmlWebpackPlugin = require('html-webpack-plugin');//加载html页面所需模块
const CleanWebpackPlugin = require('clean-webpack-plugin');//清理dist文件夹中多余的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath ='/';

module.exports={

	mode:'development',//开发环境
	// mode:'production'//线上环境
	//入口文件
	entry:'./src/index.js',// ======= entry:{ main:'./src/index.js'  }

	output:{
		//导出文件命名//如果多个入口文件，那么filename命名需要加上[name ]
		filename:'bundle.js',
		publicPath:publicPath,//影响到打包时生成的bundle.js路径，加‘/’使请求地址从根(域名)开始拼凑，不加‘/’地址会在当前地址基础上拼凑
		//导出路径
		path:path.resolve(__dirname,'dist')
	},
	resolve:{//配置别名
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			api:path.resolve(__dirname,'./src/api'),
			util:path.resolve(__dirname,'./src/util'),
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
		      {//处理图片
		         test: /\.(png|svg|jpg|gif)$/,
		         use: [
		           'file-loader'
		         ]
		       },
		       {
                	test:/\.js$/,
	                exclude: /(node_modules)/,//将node_modules中的js文件排除在外
	                use: {
	                    loader: 'babel-loader',
	                    options: {
	                        presets: ['env','es2015','react','stage-3'],
	                        //按需加载样式
	                        plugins: [
							    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
						    ] 
	                    }
	                },

	            }
	    ],
	   
  },
  plugins://处理html文档
 	 [
  		new HtmlWebpackPlugin({
  			template:'./src/index.html',
  			filename:'index.html',
  			// inject:'head'，index.html的script文件引入位置在head里
  			inject:true,//默认，index.html的script文件引入位置在body里所有Dom元素后
  			hash:true,//--生成随机字符串    默认是false
  		}),
  		new CleanWebpackPlugin(['dist']),
  		new MiniCssExtractPlugin({})
  ],
  devServer:{ //用来提高效率的，更改样式等不需要每次去npx webpack也不需要刷新浏览器(会隐藏dist)
  	contentBase: './dist',
  	port:8080,  //端口号
  	historyApiFallback:true//使页面路由经过刷新也可以显示正常页面
  }

}