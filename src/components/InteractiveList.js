import React,  { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import "../styles/global-styles.scss";
import "../styles/interactiveList.scss";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import { Redirect } from "react-router-dom";
import { MdLibraryAdd } from "react-icons/md";

import { Button } from "react-bootstrap";
import image from "../image/image.jpeg";
import Divider from "@material-ui/core/Divider";

import LogoutDialog from './LogoutDialog'
import  {callDeleteApi, addEditItemInState} from '../actions/dataItem'
import config from '../constants/constants'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

class InteractiveList extends React.Component {
  constructor(props) {
    super(props)

   this.state = {
      selectedEntity :  {},
      isShowDialog: false
    }
    //document.getElementById(this.state.activeId).style.color = 'black';
  
  
}

  hanldeLinkItemClick(e, nameList, props, routePath, mode, editableValues) {
    if (routePath === "Product") {
      //var url = "/home/Product/" + nameList;
    } else if (routePath === "add") {

      if(mode === 'edit'){

        //this.props.addEditItemInState(editableValues)
        
      localStorage.setItem("editableValues", JSON.stringify(editableValues))

        }


      var url = `/home/${mode}/` + nameList;
    } else {
      var url = "/" + routePath + "/" + nameList;
    }
    props.history.push(url);
    
//props.navigation.navigate(url, { /* params go here */ })
  }
  
  handleItemDelete(e, nameList, props, routePath, isShowDialog) {
 //   closeLogoutDialog()


    this.setState({
      isShowDialog : !this.state.isShowDialog,
      selectedEntity : nameList
    })
  
  }
  
  

  

  

 renderImage(srcImg) {
  console.log('renderImage'+srcImg);
  let srcImgUrl = 'http://localhost:10010/' + srcImg
  return (
   
      <img
        id="categoryImage"
        height="28px"
        width="28px"
        src={srcImgUrl}
        alt="Category Image"
      />
  );
}




    closeLogoutDialog = () => {
   let {isShowDialog } =  this.state
   this.setState({
    isShowDialog : !isShowDialog
   })
  }
   setSelectedEntity = (nameList) => {
    this.setState({
      selectedEntity : nameList
      
    });

  }


deleteSpecifiedEntity = (selectedEntity) => {
  let deleteObject= {
    entityType : this.props.pageName,
    entityId  : selectedEntity[config.idMapping[this.props.pageName]]
  }

  this.props.callDeleteApi(deleteObject)
  this.setState({
    isShowDialog : !this.state.isShowDialog
  })


}
  
render(){
  var nameLists = this.props.data;
  const colClass = this.props.bootStrapClass || "col-md-6";
  let gridClass = this.props.image ? "col-md-4" : "col-md-6";
  let itemType = "";
  if (this.props.pageName === "subCategory") {
    itemType = "Sub Category";
  } else {
    itemType = this.props.pageName;
  }
  
  
  return (
  <div class="container containerClass">
     <LogoutDialog
        open={this.state.isShowDialog}
        negativeActionCallBack={this.closeLogoutDialog}
        positiveActionCallBack={() => this.deleteSpecifiedEntity(this.state.selectedEntity)}
        title={`Delete ${itemType}`}
        message={`Are you sure, you want to delete this item ?`}
        positiveButtonText={"YES"}
        negativeButtonText={"NO"}
      />
    <div class="row rowClass">
      <div className="col-xs-6 col-md-2 addButtonDiv">
        <Button
          bsStyle="button-class"
          bsSize="small"
          id="_valveClosed"
          className="button button-class addButtonClass"sssss
          onClick={e => this.hanldeLinkItemClick(e, this.props.pageName, this.props, "add", "add", {})}
          
        // disabled={
        // this.editedFields.length > 0 ? false : true
        // }
        >
          <span className="setIconAdd">
            {" "}
            <MdLibraryAdd />{" "}
          </span>
          <span> Add {itemType} </span>
        </Button>
      </div>
    </div>
    <div class="row categoryTableHeader rowClass">
      <div className={"col-xs-12 col-xs-4 col-md-5"}>
        <div className="categoryElementsHeader">
          <p className="categoryHeaderStyle"> {itemType.toUpperCase()} NAME</p>
        </div>
      </div>
      <div className={"col-xs-12 col-xs-3 col-md-4"}>
        <div className="listElementsHeader">
          <p className="categoryHeaderStyle"> {itemType.toUpperCase()} ID</p>
        </div>
      </div>
      <div className={"col-xs-12 col-xs-2 col-md-1"}>
        <div className="listElementsHeader">
          <p className="categoryHeaderStyle"> EDIT</p>
        </div>
      </div>
      <div className={"col-xs-12 col-xs-2 col-md-1"}>
        <div className="listElementsHeader">
          <p className="categoryHeaderStyle"> DELETE</p>
        </div>
      </div>
    </div>
    <div class="row category_row">
      <div class="col-xs-12 col-md-12">
        <ul>
          {nameLists &&
            nameLists.map(nameList => (
              <div>
                <div className="row blockTheme">
                <div  onClick={e =>
                      this.hanldeLinkItemClick(e, nameList.name, this.props, this.props.pageName, nameList)}>
                  <div className="col-xs-4 col-md-5 categoryRow">
                  
                    {this.renderImage(nameList.imageurl)}
                   
                    <div className="listElements">
                      <p
                        className="nameStyle">
                        {" "}
                        {nameList.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-xs-3 col-md-4 listElementsRow">
                  <p className="categoryIdStyle">
                        {nameList.item_type_id}
                      </p>
                  </div>
                  </div>
                  <div class="col-xs-2 col-md-1 setEditIconButton">
                    <MdModeEdit 
                    
          onClick={e => this.hanldeLinkItemClick(e, this.props.pageName, this.props, "add", "edit", nameList)}
                    />
                  
                  </div>
                  <div class="col-xs-2 col-md-1 setDeleteIconButton">
                    <div>
                      <MdDeleteForever
                       onClick={e =>
                        this.handleItemDelete(e, nameList, this.props, this.props.pageName, this.state.isShowDialog)}
                      />
                    </div>
                  </div>
                </div>
                <Divider className="category_divider" />
              </div>
            ))}
        </ul>
      </div>
     
    </div>
  </div>
);
}

}


function mapStateToProps(state) {
  return {

  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      callDeleteApi : callDeleteApi,
      addEditItemInState: addEditItemInState
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(InteractiveList)


  