import React from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import pageConfig from '../constants/pageConfig'
import {appendActivatedRoutes} from '../actions/treeview'
import {getChildEntityData} from '../actions/dataItem'
import InteractiveList from '../components/InteractiveList'
import {getParentUuid} from '../utils/utility'

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}



class itemContainer extends React.Component {
  constructor(props) {
    super(props)
    
    // this.state = {
    // }

  }

  getItemData = (type, name, props)=>{
    let id = ''
    let queryParam = ``
    switch(type) {
      case 'Category':
        id = getParentUuid(name, props.categoryData, 'item_type_id')
        queryParam = `item_type_id=${id}`
        props.getChildEntityData('subCategory',queryParam)
        break;
      case 'subCategory':
        let nameCategory = props.activatedRoutes && props.activatedRoutes[1].Name
        id = getParentUuid(nameCategory, props.categoryData, 'item_type_id')
         let itemId = getParentUuid(name, props.subCategoryData, 'item_id')
         if(props.categoryData && props.subCategoryData){
          
        queryParam = `item_type_id=${id}&item_id=${itemId}`
        props.getChildEntityData('product', queryParam)
         }

          break;
      default:
        // code block
    }


  }


  
  componentDidMount() {
    let type = this.props.match.params.itemName;
    let name = this.props.match.params.catName;
    
    let selectedNode = {
      Name : name,
      path : '/'+type+'/'+ name,
      type:'child'  
    }
    this.props.appendActivatedRoutes(selectedNode)
    this.getItemData(type, name, this.props)
    //this.props.getSubCategoryData()
  }

  componentWillReceiveProps(nextProps){
    
  let type = nextProps.match.params.itemName;
  let name = nextProps.match.params.catName;
  if(nextProps.subCategoryData === undefined && nextProps.categoryData && nextProps.isItemdataLoaded !== false){
    let catName = nextProps.activatedRoutes[1].Name
   let  id = getParentUuid(catName, nextProps.categoryData, 'item_type_id')
   let queryParam = `item_type_id=${id}`
   nextProps.getChildEntityData('subCategory',queryParam)
  }
    if(this.props.match.params.itemName !== nextProps.match.params.itemName)
  {
    
    let selectedNode = {
      Name : name,
      path : '/'+type+'/'+ name,
      type:'child'  
    }
    
    this.getItemData(type, name, nextProps)               
    this.props.appendActivatedRoutes(selectedNode)
  
}
else if(nextProps.match.params.itemName === 'subCategory' && nextProps.productData === undefined && nextProps.subCategoryData && nextProps.isItemdataLoaded !== false) {

  this.getItemData(type, name, nextProps)

}

if(this.props.isItemDeleted === false && this.props.isItemDeleted !== nextProps.isItemDeleted){
  this.getItemData(type, name, nextProps)
      }
  }

  mapPageNamewithitemName(pageName){
    const mapping = {
      home : 'Category',
      Category  : 'subCategory',
      subCategory: 'Product' 
    }
    return mapping[pageName]
  
  }


  

  setItem() {
    let buttonConfig = pageConfig.categoryConfig.buttonConfig
    
    let pageName = this.mapPageNamewithitemName(this.props.match.params.itemName)
    if(pageName === 'subCategory'){
      var data =  this.props.subCategoryData
    }
    else{
      var data =  this.props.productData
    
    }
    
    return (
      <div>
        <InteractiveList 
          buttonConfig = {buttonConfig}
          data = {data}
          history = {this.props.history}
          pageName = {pageName}
          image = {pageName === 'products' ? true : false}
          bootStrapClass = {pageName === 'products' ? 'col-md-9' : "col-md-6" }

        />
      </div>
    )
  }
  render() {
    return (this.setItem())
  }
}

function mapStateToProps(state) {
  return {
    activatedRoutes : state.treeview.activatedRoutes,
    subCategoryData: state.dataItem.subCategorydata,
    productData: state.dataItem.productdata,
    categoryData: state.dataItem.categoryData,
    isItemdataLoaded: state.dataItem.isItemdataLoaded,
    isItemDeleted : state.dataItem.isItemDeleted
    

  }
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      getChildEntityData:getChildEntityData,


    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(itemContainer)

