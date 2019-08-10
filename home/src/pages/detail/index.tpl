
<div class="product-intro clearfix">
	<div class="product-img">
		<div class="product-main-img">
			<img src='{{imageFirst}}' alt=""/>
		</div>
		<ul class="product-small-img-list clearfix">
			{{#images}}
			<li class="product-samll-img-item">
				<img src='{{.}}' alt=""/>
			</li>
			{{/images}}
		</ul>
	</div>
	<div class="product-info">
		<h2 class="prouct-name">{{name}}</h2>
		<p class="product-description">{{description}}</p>
		<div class="product-price">
			<span class="label">价格</span>
			<span class="info">￥<span>{{price}}</span></span>
		</div>
		<div class="product-stock">
			<span class="label">库存</span>
			<span class="info">{{stock}}</span>件
		</div>
		<div class="product-number clearfix">
			<span class="label">数量</span>
			<span class="count-btn minus">
				<i class="fa fa-minus"></i>
			</span>
			<input type="text" value="1" class="count-input">
			<span class="count-btn plus">
				<i class="fa fa-plus"></i>
			</span>
			
		</div>
		<div class="dowhat">
			<div class="cart">加入购物车</div>
			<div class="shopping">立即购买</div>
		</div>
	</div>
</div>
<div class="product-detail">
	<div class="tab">
		<ul class="tab-list">
			<li class="tab-item active">商品详情</li>
			<li class="tab-item">用户评论</li>
		</ul>
		<div class="tab-panel">
			{{{detail}}}    <!-- 三个大括号解决html里有标签问题 -->
		</div>
	</div>
</div>
