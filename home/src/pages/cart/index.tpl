<ul class="product-title clearfix">
	<li class="product-select">
		{{#allChecked}}
		<input type="checkbox" checked class="select-all">
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox"  class="select-all">
		{{/allChecked}}
		<span>全选</span>
	</li>
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
	<li class="product-opreation">
		<span>操作</span>
	</li>
</ul>
{{#cartList}}
<ul class="product-item {{selected}} clearfix" data-product-id="{{productId._id}}">
	<li class="product-select">
		{{#checked}}
		<input type="checkbox" checked class="select-one" />
		{{/checked}}
		{{^checked}}
		<input type="checkbox" class="select-one" />
		{{/checked}}
	</li>
	<li class="product-info text-ellipsis">
		<a href="./detail.html?productId={{productId._id}}" class="product-info-link" target="_blank">
			<img src="{{productId.image}}" alt=""/>
			<span class="product-info-text ">{{productId.name}}</span>
		</a>
	</li>
	<li class="product-price">
		<span>￥{{productId.price}}</span>
	</li>
	<li class="product-count">
		<span class="count-btn minus">
			<i class="fa fa-minus"></i>
		</span>
		<input class="count-input" value="{{count}}"/>
		<span class="count-btn plus">
			<i class="fa fa-plus"></i>
		</span>
	</li>
	<li class="product-total-price">
		<span>￥{{price}}</span>
	</li>
	<li class="product-opreation">
		<span class="delete-one">
			<i class="fa fa-trash-o"></i>删除
		</span>
	</li>
</ul>
{{/cartList}}
<ul class="product-footer">
	<li class="product-select">
		{{#allChecked}}
		<input type="checkbox" checked class="select-all">
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all">
		{{/allChecked}}
		<span>全选</span>
	</li>
	<li class="remove-select">
		删除选中的商品
	</li>
	<li class="remove-all">清理购物车</li>
	<li class="total-price">
		<span class="total-price-text">总价:</span>
		<span class="money">￥{{totalPrice}}</span>
	</li>
	<li class="toPay btn btn-submit">
		去结算
	</li>
</ul>