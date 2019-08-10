{{#list}}   <!-- 循环 -->
	{{#isActive}}       <!-- 判断是否为true -->
	<li class="side-item active">
	{{/isActive}}
	{{^isActive}}
	<li class="side-item">
	{{/isActive}}
		<a href="{{href}}" class="link">{{desc}}</a>
	</li>

{{/list}}