<ul>
	{{#carousels}}
    <li>
    	<a href=".list.html/categoryId={{categoryId}}">
    		<!-- src不需要<%= require(...)>这样写是因为-->
    		<!-- webpack并不能对tpl中的jpg进行处理  -->
    		<!-- <img src="<%= require('{{image}}') %>" alt=""> -->
    		<img src="{{img}}" alt="">
    	</a>
    </li>
    {{/carousels}}
</ul>
<span class="arrow prev">
	<i class="fa fa-angle-left"></i>
</span>
<span class="arrow next">
	<i class="fa fa-angle-right"></i>
</span>