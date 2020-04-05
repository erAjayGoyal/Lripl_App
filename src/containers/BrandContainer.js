import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {appendActivatedRoutes, getBrandData} from '../actions/treeview'
import BrandList from '../components/brandList'
import _ from 'lodash'


class brandContainer extends React.Component {
  constructor(props) {
    super(props)

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
    this.props.getBrandData()
    //this.props.getSubCategoryData()
  }

//   componentWillReceiveProps(nextProps){
    
//   let type = nextProps.match.params.itemName;
//   let name = nextProps.match.params.catName;
//   if(nextProps.subCategoryData === undefined && nextProps.categoryData && nextProps.isItemdataLoaded !== false){
//     let catName = nextProps.activatedRoutes[1].Name
//    let  id = getParentUuid(catName, nextProps.categoryData, 'item_type_id')
//    let queryParam = `item_type_id=${id}`
//    nextProps.getChildEntityData('subCategory',queryParam)
//   }
//     if(this.props.match.params.itemName !== nextProps.match.params.itemName)
//   {
    
//     let selectedNode = {
//       Name : name,
//       path : '/'+type+'/'+ name,
//       type:'child'  
//     }
    
//     this.getItemData(type, name, nextProps)               
//     this.props.appendActivatedRoutes(selectedNode)
  
// }
// else if(nextProps.match.params.itemName === 'subCategory' && nextProps.productData === undefined && nextProps.subCategoryData && nextProps.isItemdataLoaded !== false) {

//   this.getItemData(type, name, nextProps)

// }
//   }

  mapPageNamewithitemName(pageName){
    const mapping = {
      home : 'Category',
      Category  : 'subCategory',
      subCategory: 'Product' 
    }
    return mapping[pageName]
  
  }
  


  

  setItem() {
      var data =  this.props.brandData
      var formattedArray = []
      if(data && data.length > 0){
        formattedArray =_.chunk(data, 4)
      }
    return (
      <div>
        <BrandList 
         // buttonConfig = {buttonConfig}
          data = {formattedArray}
          history = {this.props.history}
        //  pageName = {pageName}
        ///  image = {pageName === 'products' ? true : false}
        //  bootStrapClass = {pageName === 'products' ? 'col-md-9' : "col-md-6" }

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
    brandData :  state.treeview.brandData
    ,

    

  }
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      getBrandData:getBrandData,


    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(brandContainer)

