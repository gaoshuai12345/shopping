<div class="modal" id="modal">
	<div class="modal-container">
		<div class="modal-header">
			<h2 class="modal-title">新增地址</h2>
			<i class="fa fa-close close-icon"></i>
		</div>
		<div class="modal-body">
			<div class="form">
				<div class="form-box">
					<div class="errorMsg"> 
						<i class="fa fa-minus-circle"></i>
						<span class="error-msg">error</span>
					</div>
					<div class="form-item">
						<label for="" class="form-label">
							<i class="fa fa-user"></i>
						</label>
						<input type="text" class="form-content" name="name" placeholder="请输入收件人姓名" value="{{shipping.name}}">
					</div>
					<div class="form-item">
						<label for=""  class="form-label">
							<i class="fa fa-phone"></i>
						</label>
						<input type="text" class="form-content" name="phone" placeholder="请输入手机号" value="{{shipping.phone}}">
					</div>
					<div class="form-item city-item">
						<label for="" class="form-label">
							<i class="fa fa-map-marker"></i>
						</label>
						<select name="province" class="provinceSelect">
						</select>
						<select name="city" class="citySelect">
							<option value="请选择" >请选择</option>
						</select>
					</div>
					<div class="form-item">
						<label class="form-label">
							<i class="fa fa-building"></i>
						</label>
						<input type="text" class="form-content" name="address" placeholder="请输入详细地址,街道、门牌号" value="{{shipping.address}}">
					</div>
					<div class="form-item">
						<label for=""  class="form-label">
							<i class="fa fa-envelope"></i>
						</label>
						<input type="text" class="form-content" name="zip" placeholder="请输入邮编，如474173" value="{{shipping.zip}}">
					</div>
					<div>
						<a href="javascript:;" class="btn btn-submit" id="btn-submit">提交</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>