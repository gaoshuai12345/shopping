<ul class="clearfix">
	{{#list}}
		<li class="product-list-item">
			<a href="./detail.html?productId={{_id}}" target="_blank">
				<img src="{{imageFirst}}" class="product-image" alt="{{name}}" />
				<p class="product-price">￥{{price}}</p>
				<p class="product-name text-ellipsis">{{name}}</p>
			</a>
		</li>
	{{/list}}
	{{^list}}
		<p class="error">您要找的商品移居火星了!!!</p>
	{{/list}}
</ul>