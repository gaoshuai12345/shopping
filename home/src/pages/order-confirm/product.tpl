<div class="panel">
	<h2 class="panel-header">
		商品清单
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
		{{#cartList}}
			<ul class="product-item {{selected}} clearfix" data-product-id="{{productId._id}}">
				<li class="product-info text-ellipsis">
					<a href="./detail.html?productId={{productId._id}}" class="product-info-link" target="_blank">
						<img src="{{productId.image}}" alt=""/>
						<span class="product-info-text">{{productId.name}}</span>
					</a>
				</li>
				<li class="product-price">
					<span>￥{{productId.price}}</span>
				</li>
				<li class="product-count">
					<span>11{{count}}</span>
				</li>
				<li class="product-total-price">
					<span>￥{{price}}</span>
				</li>
			</ul>
		{{/cartList}}
		<ul class="product-footer">
			<li class="Pay">
				<span class="total-price-text">总价:</span>
				<span class="money">￥{{totalPrice}}</span>
				<span class="btn btn-submit">去付款</span>
			</li>
		</ul>
	</div>
	
</div>