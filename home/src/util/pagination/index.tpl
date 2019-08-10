<ul class="pagiantion-list clearfix">
	{{#pageArr}}
		{{#disabled}}
			<li class="page-item disabled" data-value='{{value}}'>{{name}}</li>
		{{/disabled}}
		{{^disabled}}
			{{#active}}
				<li class="page-item active" data-value='{{value}}'>{{name}}</li>
			{{/active}}
			{{^active}}
				<li class="page-item" data-value='{{value}}'>{{name}}</li>
			{{/active}}
		{{/disabled}}
	{{/pageArr}}
	<li class="page-sum">{{current}}/{{pages}}</li>
</ul>