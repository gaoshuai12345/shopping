<div class="panel">
	<h2 class="panel-header">
		订单列表
	</h2>
	<div class="panel-body">
		<ul class="product-title clearfix">
			<li class="product-info">
				<span>商品</span>
			</li>
			<li class="product-price">
				<span>单价</span>
			</li>
			<li class="product-count">
				<span class="product-countMenu-text">数量</span>
			</li>
			<li class="product-total-price">
				<span>小计</span>
			</li>

		</ul>
		{{#list}}
			<ul class="order-info">
				<li class="order-orderNo">
					<span class="lable">
						订单编号:
					</span>
					<span class="text">
						{{orderNo}}
					</span>
				</li>
				<li class="order-user">
					<span class="lable">
						收件人:
					</span>
					<span class="text">
						{{shipping.name}}
					</span>
				</li>
				<li class="order-createdTime">
					<span class="lable">
						创建时间:
					</span>
					<span class="text">
						{{createdTime}}
					</span>
				</li>
				<li class="order-paymentStatusDesc">
					<span class="lable">
						支付状态:
					</span>
					<span class="text">
						{{statusDesc}}
					</span>
				</li>
				<li class="order-payment">
					<span class="lable">
						支付金额:
					</span>
					<span class="text">
						￥{{payment}}
					</span>
				</li>
				
				<li class="order-detail">
					<a class="link" target="_blank" href="./order-detail.html?orderNo={{orderNo}}">查看详情</a>
				</li>
			</ul>
			{{#productList}}
				<ul class="product-item  clearfix">
					<li class="product-info text-ellipsis">
						<a href="./detail.html?productId={{productId._id}}" class="product-info-link" target="_blank">
							<img src="{{image}}" alt=""/>
							<span class="product-info-text">{{name}}</span>
						</a>
					</li>
					<li class="product-price">
						<span>￥{{price}}</span>
					</li>
					<li class="product-count">
						<span>{{count}}</span>
					</li>
					<li class="product-total-price">
						<span>￥{{totalPrice}}</span>
					</li>
				</ul>
			{{/productList}}
		{{/list}}
	</div>
	
</div>