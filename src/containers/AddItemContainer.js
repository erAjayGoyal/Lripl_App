import React from "react";
import ImageUploader from "react-images-upload";
import { Button } from "react-bootstrap";
import "../styles/global-styles.scss";
import "../styles/additem.scss";
import TextField from "../components/TextField";
import {appendActivatedRoutes, getStateData, getBrandData} from '../actions/treeview'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import EllipsisWithTooltipExt from "../components/EllipsisWithTooltipExt";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {postItemData, getChildEntityData, updateItemData} from '../actions/dataItem'
import {getParentUuid, formatOptions} from '../utils/utility'

import Select from 'react-select';

import _ from 'lodash'
// import makeAnimated from 'react-select/animated';
// const animatedComponents = makeAnimated();

class AddItemContainer extends React.Component {
  constructor(props) {
    super(props);
    
    let itemCategory = props.match.params.itemName;
    let modeOfOperation = props.match.params.mode

    this.modeDetail = modeOfOperation.charAt(0).toUpperCase() + modeOfOperation.slice(1)
    this.itemData = {}

    if(itemCategory === 'Product'){
      if(modeOfOperation === 'edit'){
        
        var editableItem = JSON.parse(localStorage.getItem('editableValues'))
          this.itemData = {      
            image : editableItem.imageurl,
            name: editableItem.name,
            imageSrc: '',
            description:editableItem.description,
            price:editableItem.price,
            state: editableItem.state_id,
            brand:editableItem.brand_id
        }
        }else{
      this.itemData = {      
        image : [],
        name: '',
        imageSrc: '',
        description:'',
        price:'',
        state: '',
        brand:[]
      }
    }
    }else{
      if(modeOfOperation === 'edit'){
        
      var editableItem = JSON.parse(localStorage.getItem('editableValues'))
        this.itemData = {      
          image : editableItem.imageurl,
          name: editableItem.name,
          imageSrc: '',
      }
      }else{


        this.itemData = {      
          image : [],
          name: '',
          imageSrc: '',
      }
      }
    }
    //let initialStateData = Object.assign({}, this.itemData)
    this.state = {
      itemData : this.itemData
    };
  }

  componentDidMount() {
    let itemCategory = this.props.match.params.itemName;
    let selectedNode = {
      Name : "Add " + itemCategory,
      path : '/home/add/' + itemCategory,
      type:'child'  
    }
    this.props.appendActivatedRoutes(selectedNode)

    if(itemCategory === 'Product'){
      this.props.getStateData()
      this.props.getBrandData()
    }
  }


  getEditableEntity = (entityData, entityArray, id) => {
    let entityDataSelected = []
    entityArray = entityArray.split(',')
    if(entityArray && entityArray.length  > 0){


      entityArray.forEach(entity => {

          
        var index =  _.findIndex(entityData, function(o) { return o[id] == entity; });
        let obj = {
          value : entityData[index].name,
          label : entityData[index].name
        }
        entityDataSelected.push(obj)
 

    })
    }
    return entityDataSelected
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.subCategoryData === undefined && nextProps.categoryData && nextProps.isItemDataLoaded !== false){
      let catName = nextProps.activatedRoutes[1].Name
     let  id = getParentUuid(catName, nextProps.categoryData, 'item_type_id')
     let queryParam = `item_type_id=${id}`
     nextProps.getChildEntityData('subCategory',queryParam)
    }
    if(this.props.match.params.itemName !== nextProps.match.params.itemName)
{
  let type = nextProps.match.params.itemName;
   // let name = nextProps.match.params.catName;
    
   let selectedNode = {
    Name : "Add " + type,
    path : '/home/add/' + type,
    type:'child'  
  }
    this.props.appendActivatedRoutes(selectedNode)
  
}
if(nextProps.subCategoryData === undefined && nextProps.categoryData  && nextProps.isItemDataLoaded ==! false){
  let name = nextProps.activatedRoutes[1].name
  
  let id = getParentUuid(name, nextProps.categoryData, 'item_type_id')
 let queryParam = `item_type_id=${id}`
  this.props.getChildEntityData('subCategory',queryParam)
}

if(this.props.brandData !==  nextProps.brandData && this.props.brandData === undefined){
  if(this.modeDetail === 'Edit' && nextProps.match.params.itemName  === 'Product'){

    let itemData = this.state.itemData
    if(itemData.brand){
      let newBrand = this.getEditableEntity(nextProps.brandData, itemData.brand, 'brand_id')

    
      itemData.brand = newBrand
    this.setState({
      itemData : itemData
    })
  }
  }
}

if(this.props.stateData !==  nextProps.stateData && this.props.stateData === undefined){
  if(this.modeDetail === 'Edit' && nextProps.match.params.itemName  === 'Product'){

    let itemData = this.state.itemData
    if(itemData.state){
      let newState = this.getEditableEntity(nextProps.stateData, itemData.state, 'state_id')

      itemData.state = newState
    this.setState({
      itemData : itemData
    })
  }
  }
}
  }

  getProductInfo = (itemData) => {
    let zoneId = [],
        stateId = [],
        brandId = []

    if(itemData){
      if(this.props.stateData && itemData.state){
        let {stateData,  brandData}= this.props

        itemData.state.forEach(state => {

          
       var index =  _.findIndex(stateData, function(o) { return o.name == state.value; });
       stateId.push(stateData[index].state_id)


       
       if (zoneId.indexOf(stateData[index].zone_id) === -1) {
        zoneId.push(stateData[index].zone_id)
    } 
        });

        itemData.brand.forEach(brand => {

          
          var index =  _.findIndex(brandData, function(o) { return o.name == brand.value; });
          brandId.push(brandData[index].brand_id)
   
             
           });

        



       

      }

      return {
       zoneId: zoneId,
       stateId : stateId,
       brandId : brandId
      }
    }
  }
  

  
  processItemAddition = (itemData, itemType, routeMetaData) => {

    var itemObject = new FormData()
    
    itemObject.append('file', itemData.image[0])    
    itemObject.append('name', itemData.name)
    var subCategoryInfo = ''
    switch(itemType) {
      case 'subCategory':
          subCategoryInfo = routeMetaData[1].Name
        let id = getParentUuid(subCategoryInfo, this.props.categoryData, 'item_type_id')
        itemObject.append('item_type_id', id)
        break;
      case 'Product':
        
        subCategoryInfo = routeMetaData[1].Name
        let produtInfo = routeMetaData[2].Name,        
        typesId= getParentUuid(subCategoryInfo, this.props.categoryData,'item_type_id'),
        itemId = getParentUuid(produtInfo, this.props.subCategoryData, 'item_id')
        let {zoneId, stateId, brandId} = this.getProductInfo(itemData)
        
        itemObject.append('item_type_id', typesId)        
        itemObject.append('item_id', itemId)        
        itemObject.append('zoneId', zoneId)        
        itemObject.append('stateId', stateId)
              
        itemObject.append('brandId', brandId)
        break;
      default:
        // code block
    }

    console.log(itemType+'itemObject'+JSON.stringify(itemObject));
    if (itemObject) {
      this.props.postItemData(itemObject, itemType)
    }

    if(itemType === 'Product'){
      this.itemData = {      
        image : [],
        name: '',
        imageSrc: '',
        description:'',
        price:'',
        state:'',
        zone: [],
        brand:[]
      }
    }else{
      this.itemData = {      
        image : [],
        name: '',
        imageSrc: '',
    }
    }

    this.setState({
      itemData : this.itemData
    })
  }

  processItemUpdation = (itemData, itemType, routeMetaData, editableItem) => {
    var itemObject = new FormData()
    
    itemObject.append('file', itemData.image[0])    
    itemObject.append('name', itemData.name)

    var subCategoryInfo = ''
    let id = ''
    switch(itemType) {
      case 'Category' : 
         id = editableItem.item_type_id
         itemObject.append('id', id)

        break;
      case 'subCategory':
        id = editableItem.item_id
        itemObject.append('id', id)
        break;
      case 'Product':
        
        id = editableItem.product_id
        itemObject.append('id', id)
        subCategoryInfo = routeMetaData[1].Name
        let produtInfo = routeMetaData[2].Name,        
        typesId= getParentUuid(subCategoryInfo, this.props.categoryData,'item_type_id'),
        itemId = getParentUuid(produtInfo, this.props.subCategoryData, 'item_id')
        let {zoneId, stateId, brandId} = this.getProductInfo(itemData)
        
        itemObject.append('item_type_id', typesId)        
        itemObject.append('item_id', itemId)        
        itemObject.append('zoneId', zoneId)        
        itemObject.append('stateId', stateId)
              
        itemObject.append('brandId', brandId)
        break;
      default:
        // code block
    }

    // const data = new FormData() 
    // data.append('file', itemData.image[0])    
    // data.append('name', itemData.name)
    



    // let itemType = this.props.match.params.itemName;
    if (itemObject) {
      this.props.updateItemData(itemObject, itemType)
    }

    if(itemType === 'Product'){
      this.itemData = {      
        image : [],
        name: '',
        imageSrc: '',
        description:'',
        price:'',
        state:'',
        zone: [],
        brand:[]
      }
    }else{
      this.itemData = {      
        image : [],
        name: '',
        imageSrc: '',
    }
    }

    this.setState({
      itemData : this.itemData
    })
  }


  addItemDetails = (e, mode) => {
    
    var editableItem = JSON.parse(localStorage.getItem('editableValues'))
    if(mode === 'Add'){
        
      let { itemData } = this.state
      let itemType = this.props.match.params.itemName
      let routeMetaData = this.props.activatedRoutes

      this.processItemAddition(itemData, itemType, routeMetaData)

    }
    else{
        
      let { itemData } = this.state
      let itemType = this.props.match.params.itemName
      let routeMetaData = this.props.activatedRoutes

      this.processItemUpdation(itemData, itemType, routeMetaData, editableItem)

    }

    
    
  }

  saveInputData = (event) => {
    var { name, value } = event.target
    if(name === 'name' && value.length > 0){
      value = value[0].toUpperCase() + value.slice(1); 
    }
    let { itemData } = this.state
    itemData[name] = value
    this.setState({
      itemData
    })

  }


  clearImage = () => {
    let { itemData } = this.state
    itemData.image = []
    this.setState({
      itemData
    });
  };
  renderImage = () => {
    let modeOfOperation = this.props.match.params.mode,
        imageSrc
        if(modeOfOperation === 'edit'){
          if(this.state.itemData.imageSrc.length > 0){
            imageSrc = this.state.itemData.imageSrc
          }
          else{
            imageSrc = 'http://localhost:10010/'+this.state.itemData.image

          }
        }
        else{
          
          imageSrc = this.state.itemData.imageSrc
        }


       


    return (
      <div class="form-group row">
        <div class="col-xs-4">
          <EllipsisWithTooltipExt placement="top">
            Imgae Choosen
          </EllipsisWithTooltipExt>
          {/* <label for="last_name" class="col-xs-3 col-form-label mr-2">Upload Image</label> */}
        </div>
        <div class="col-xs-8 centerImage">
          <img
            id="img_header_logo"
            height="100px"
            width="100px"
            src={imageSrc}
            alt="Company logo"
          />
        </div>
        <div class="col-xs-8 centerImage setButtonEdit">
         <Button
              bsStyle="button-class"
              bsSize="small"
              id={"cancel_item"}
              className="button button-class "
              onClick={e => this.clearImage()}
            >
              Edit
            </Button>
        </div>
      </div>
    );
  };

  renderUploadImageProduct = () => {
    return (
      <div class="form-group row">
        <div class="col-xs-4 col-md-offset-4">
          <EllipsisWithTooltipExt placement="top">
            Upload Image
          </EllipsisWithTooltipExt>
          {/* <label for="last_name" class="col-xs-3 col-form-label mr-2">Upload Image</label> */}
        </div>
        <div class="col-xs-8 col-md-offset-2">
          <ImageUploader
          id = 'hello'
            withIcon={true}
            buttonText="Choose images"
            buttonClassName="button-class-upload"
            onChange={e => this.onDrop(e)}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          
        </div>
      </div>
    );
  };


  
  renderImageProduct = () => {
    
    let modeOfOperation = this.props.match.params.mode,
        imageSrc
        if(modeOfOperation === 'edit'){
          if(this.state.itemData.imageSrc.length > 0){
            imageSrc = this.state.itemData.imageSrc
          }
          else{
            imageSrc = 'http://localhost:10010/'+this.state.itemData.image

          }
        }
        else{
          
          imageSrc = this.state.itemData.imageSrc
        }


       
    return (
      <div class="form-group row">
        <div class="col-xs-4 col-md-offset-5">
          <EllipsisWithTooltipExt placement="top">
            Imgae 
          </EllipsisWithTooltipExt>
          {/* <label for="last_name" class="col-xs-3 col-form-label mr-2">Upload Image</label> */}
        </div>
        <div class="col-xs-8 col-md-offset-2 centerImage">
          <img
            id="img_header_logo"
            height="200px"
            width="200px"
            src={imageSrc}
            alt="Company logo"
          />
          
        </div>
        <div class="col-xs-12 alignEditBtn">
         <Button
              bsStyle="button-class"
              bsSize="small"
              id={"cancel_item"}
              className="button button-class "
              onClick={e => this.clearImage()}
            >
              Edit
            </Button>
        </div>
      </div>
    );
  };


  renderUploadImage = () => {
    return (
      <div class="form-group row">
        <div class="col-xs-4">
          <EllipsisWithTooltipExt placement="top">
            Upload Image
          </EllipsisWithTooltipExt>
          {/* <label for="last_name" class="col-xs-3 col-form-label mr-2">Upload Image</label> */}
        </div>
        <div class="col-xs-8">
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            buttonClassName="button-class-upload"
            onChange={e=>this.onDrop(e)}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>
      </div>
    );
  };

  renderImageBlock = () => {
    if (this.state.itemData.image.length > 0) {
      this.renderImage();
    } else {
      this.renderUploadImage();
    }
  };


  onDrop = (picture) => {
    let {itemData} = this.state
    
    let reader = new FileReader();

    reader.onloadend = () => {

      
      itemData.image = picture
      itemData.imageSrc = reader.result
      this.setState({
        
      itemData: itemData
        
      });
    }
    
    reader.readAsDataURL(picture[0])

  };
  renderAdditionalField = item => {
    if (item === "Product") {
      return (
        <div>
          <div class="form-group row">
            <label
              for="product_description"
              class="col-xs-4 col-form-label mr-2"
            >
              {" "}
              Description
            </label>
            <div class="col-xs-8">
              <textarea value="helooo" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-xs-4 col-form-label mr-2"> Product Zone</label>
            <div class="col-xs-8">
              <input
                type="text"
                class="form-control"
                id="product_zone"
                name="product_zone"
              ></input>
            </div>
          </div>

          <div class="form-group row">
            
          <div class="col-xs-4">
                      {/* <label for="first_name" class="col-xs-4 col-form-label mr-2">{itemCategory} Name</label> */}
                      <EllipsisWithTooltipExt placement="top">
                        {item} Price
                      </EllipsisWithTooltipExt>
                    </div>
                    <div class="col-xs-8">
                      <TextField
                        className="textField"
                        id={item + "_Price"}
                        type="text"
                        //onKeyPress={this.isNumber}
                        value=""
                        onChange={e => {
                          console.log("enter");
                        }}
                      />


</div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  routeToParent = categoryName => {
    this.props.history.goBack();
  };

  handleDropDownValue = (event, name) => {
    let  value  = event
    let { itemData } = this.state
    itemData[name] = value
    this.setState({
      itemData: itemData
    })

  }
  checkAddEnabled = (itemData) => {
    
    if(itemData){
      let isEnabled = true
      for(let key in itemData){
        if(key !== 'description' && key !== 'price' && key !== 'zone'){
          
        if(itemData[key] !== undefined && itemData[key].length < 1){
          isEnabled = false
          break
        }
        }
      }      
    return isEnabled
    }
  }
  renderProductPage = (itemCategory) => {
    
    // const options = ['North', "South", "West", "East"]
    // const stateOptions = ['Delhi', 'Gurgaon', 'chennai', 'Banglore']
    //const defaultOption = options[0]
    
    let modeOfOperation = this.props.match.params.mode
    let {itemData} = this.state
    let isEnabled = this.checkAddEnabled(itemData)
return (
    <div class="container">
    <div class="row rowStyle rowSet">
      <div class="row">
        <div className="col-xs-12 col-md-12">
<h3 className="heading">{this.modeDetail}{itemCategory}</h3>
        </div>
      </div>
      <div className = 'row'>

      <div class="col-xs-6 col-md-5 col-md-offset-1">
        <div class="row">
          <div class="col-xs-6 col-md-12">
            <div class="row blockTheme setFormContainer">
              <div className="col-xs-12 col-md-12">
                <form>
                  <div class="form-group row formLeftMargin">
                    <div class="col-xs-4">
                      {/* <label for="first_name" class="col-xs-4 col-form-label mr-2">{itemCategory} Name</label> */}
                      <EllipsisWithTooltipExt placement="top">
                        {itemCategory} Name
                      </EllipsisWithTooltipExt>
                    </div>
                    <div class="col-xs-8">
                    
                      <TextField
                        className="textField"
                        id={itemCategory + "_name"}
                        type="text"
                        value={this.state.itemData.name}
                        name= 'name'
                        onChange={e => {
                          this.saveInputData(e)
                        }}
                      />

                    </div>
                  </div>
                   <div>
          <div class="form-group row">
            <label
              for="product_description"
              class="col-xs-4 col-form-label mr-2"
            >
              {" "}
              Description
            </label>
            <div class="col-xs-8">
              <textarea 
              className= 'textArea' 
              value={this.state.itemData.description}
              name= 'description'
              onChange={e => {
                this.saveInputData(e)
              }}
              
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-xs-4 col-form-label mr-2"> Product Brand</label>
            <div class="col-xs-8">

            <Select
      closeMenuOnSelect={false}
      isMulti
      options={this.props.brandOptions}
      onChange={(e) => {this.handleDropDownValue(e, 'brand')}}
      value = {this.state.itemData.brand}
    />
            </div>
          </div>
          
          <div class="form-group row">
            <label class="col-xs-4 col-form-label mr-2"> Product State</label>
            <div class="col-xs-8">

{/* 
<Dropdown options={stateOptions} 
onChange={(e) => {this.handleDropDownValue(e, 'state')}}                            
value={this.state.itemData.state}
name = "state"  

placeholder="Select" /> */}

<Select
      closeMenuOnSelect={false}
      //components={animatedComponents}ss
     // defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={this.props.stateOptions} 
      name = "state" 
      onChange={(e) => {this.handleDropDownValue(e, 'state')}} 
      value = {this.state.itemData.state}
    />
              
            </div>
          </div>

          <div class="form-group row">
            <label class="col-xs-4 col-form-label mr-2"> Product Price</label>
            <div class="col-xs-8">
            <TextField
                        className="textField"
                        id={itemCategory + "_price"}
                        type="text"
                        value={this.state.itemData.price}
                        name= 'price'
                        onChange={e => {
                          this.saveInputData(e)
                        }}                
                        />
            </div>
          </div>
        </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6 col-md-4 col-md-offset-1 ">
        <div class="row">
          <div class="col-xs-6 col-md-12">
            <div class="row blockTheme setFormContainer">
              <div className="col-xs-12 col-md-12">
                <form>
                  <div class="form-group row formLeftMargin">
                    
                  {this.state.itemData.image && this.state.itemData.image.length > 0
                    ? this.renderImageProduct()
                    : this.renderUploadImageProduct()}

                 </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* <div class="row">
        <div className="col-xs-12 col-md-12">
          <h3 className="heading">Add {itemCategory}</h3>
        </div>
      </div>
     */}
      <div class="row">
                    <div class="col-md-offset-5 col-xs-1">
                      <Button
                        bsStyle="button-class"
                        bsSize="small"
                        id={"cancel_item"}
                        className="button button-class buttonFloat"
                        onClick={e => this.addItemDetails(e, this.modeDetail)}
                        disabled={! isEnabled}
                       >
                        {this.modeDetail}
                      </Button>
                    </div>
                    <div class=" col-xs-1">
                      <Button
                        bsStyle="button-class"
                        bsSize="small"
                        id={"add_item"}
                        className="button buttonClassCancel buttonFloat "
                        onClick={e => this.routeToParent(itemCategory)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
    </div>
  </div>
)
    
  }

  renderGeneralPage = (itemCategory) =>{
    
    let {itemData} = this.state
    let isEnabled = this.checkAddEnabled(itemData),
        modeOfOperation = this.props.match.params.mode
    return (
      <div class="container">
        <div class="row rowStyle rowSet">
          <div class="row">
            <div className="col-xs-12 col-md-12">
          <h3 className="heading">{this.modeDetail}{itemCategory}</h3>
            </div>
          </div>
          <div className = 'row'>

          <div class="col-xs-6 col-md-6 col-md-offset-3">
            <div class="row">
              <div class="col-xs-6 col-md-12">
                <div class="row blockTheme setFormContainer">
                  <div className="col-xs-12 col-md-12">
                    <form>
                      <div class="form-group row formLeftMargin">
                        <div class="col-xs-4">
                          {/* <label for="first_name" class="col-xs-4 col-form-label mr-2">{itemCategory} Name</label> */}
                          <EllipsisWithTooltipExt placement="top">
                            {itemCategory} Name
                          </EllipsisWithTooltipExt>
                        </div>
                        <div class="col-xs-8">
                          <TextField
                            className="textField"
                            id={itemCategory + "_name"}
                            type="text"
                            name="name"
                            //onKeyPress={this.isNumber}
                            value={this.state.itemData.name}
                            onChange={e => {
                              this.saveInputData(e)
                            }}
                          />

                          {/* <input type="text" class="form-control" id="first_name" name="first_name"></input> */}
                        </div>
                      </div>
                      {this.state.itemData.image.length > 0
                        ? this.renderImage()
                        : this.renderUploadImage()}

                      {/* {this.renderAdditionalField(itemCategory)} */}
                      <div class="form-group row">
                        <div class="offset-xs-2 col-xs-3 setButton">
                          <Button
                          disabled = {!isEnabled}
                            bsStyle="button-class"
                            bsSize="small"
                            id={"cancel_item"}
                            className="button button-class buttonFloat"
                            onClick={e => this.addItemDetails(e, this.modeDetail)}
                          >
                            {this.modeDetail}
                          </Button>
                        </div>
                        <div class="offset-xs-2 col-xs-3 setButton customPadding">
                          <Button
                            bsStyle="button-class"
                            bsSize="small"
                            id={"add_item"}
                            className="button buttonClassCancel buttonFloat "
                            onClick={e => this.routeToParent(itemCategory)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    let itemCategory = this.props.match.params.itemName;
    return (
      
    <div>
    {itemCategory === 'Product'? this.renderProductPage(itemCategory) : this.renderGeneralPage(itemCategory)}
    </div>


    
    )
}
}
function mapStateToProps(state) {
  return {
    activatedRoutes : state.treeview.activatedRoutes,
    categoryData: state.dataItem.categoryData,
    subCategoryData: state.dataItem.subCategorydata,
    stateData: state.treeview.stateData,
    stateOptions: formatOptions(state.treeview.stateData),
    brandData:state.treeview.brandData,
    brandOptions: formatOptions(state.treeview.brandData),
    isItemDataLoaded : state.dataItem.isItemdataLoaded,
    editItemData: state.dataItem.editItemData,

  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      postItemData: postItemData,
      getChildEntityData:getChildEntityData,
      getStateData:getStateData,
      
      updateItemData: updateItemData,
      getBrandData:getBrandData,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddItemContainer)
