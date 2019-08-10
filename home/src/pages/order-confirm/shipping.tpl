<div class="panel">
	<h2 class="panel-header">
		收货地址
	</h2>
	<div class="panel-body">
		{{#shippings}}
			{{#isActive}}
				<div class="shipping-item active" data-shipping-id={{_id}}>
			{{/isActive}}
			{{^isActive}}
				<div class="shipping-item" data-shipping-id={{_id}}>
			{{/isActive}}
			<h3 class="shipping-title">{{province}} {{city}}({{name}})</h3>
			<div class="shipping-detail">
				{{province}} {{city}} {{address}} {{phone}}
			</div>
			<div class="shipping-opreation">
				<span class="link shipping-edit">编辑</span>
				<span class="link shipping-delete">删除</span>
			</div>
		</div>
		{{/shippings}}
		<div class="shipping-add">
			<i class="fa fa-plus"></i>
			<p>添加地址</p>
		</div>
	</div>
	
</div>