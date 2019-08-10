{{#floors}}
<div class="floor-box">
	<h2 class="floor-title">
		{{title}}
	</h2>
	
	<ul class="floor-list clearfix">
		{{#floor}}
		<li class="floor-item">
			<a href="./list.html?categoryId={{categoryId}}">
				<p class="floor-text">{{text}}</p>
				<img src="{{img}}" class="floor-img" alt="">
			</a>
		</li>
		{{/floor}}
	</ul>
</div>
{{/floors}}