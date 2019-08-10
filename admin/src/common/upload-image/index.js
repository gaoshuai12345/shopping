import React,{Component} from 'react';
import { Upload, Icon, Modal } from 'antd';


class UploadImage extends Component {
	constructor(props){
		super(props)
		this.state = {
		    previewVisible: false,
		    previewImage: '',
		    fileList: [],
		 };
		this.handleCancel=this.handleCancel.bind(this)
		this.handlePreview=this.handlePreview.bind(this)
		this.handleChange=this.handleChange.bind(this)
	}

  static getDerivedStateFromProps(props,state){
    // console.log('props::::',props.fileList)
      if(props.fileList.length>0 && state.fileList.length==0){
        return{
          fileList:props.fileList
        }
      }
      return null
  }
  handleCancel(){
  	this.setState({ 
  		previewVisible: false 
  	})
  }

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }){    //由后端返回的图片的服务器地址存储在fileList中
  	// console.log(fileList)
    this.setState({ fileList },()=>{   //需要将fileList信息从子组件传递给父组件
        this.props.getImageFilePath(fileList.map(file=>{
          return file.response
        }).join(','))        //join->由数组转换为字符串，多个字符串以','隔开
    })    
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          withCredentials={true}
        >
          {fileList.length >= this.props.max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImage;