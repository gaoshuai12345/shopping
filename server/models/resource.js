const mongoose=require('mongoose');

const roles=new mongoose.Schema({
		name:{
			type:String
		},
		path:{
			type:String
		}
	});

	
const resourceModel=mongoose.model('Resource',roles);

module.exports=resourceModel;