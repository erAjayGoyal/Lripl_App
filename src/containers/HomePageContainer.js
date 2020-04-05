import React from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import pageConfig from '../constants/pageConfig'
import {appendActivatedRoutes} from '../actions/treeview'

import InteractiveList from '../components/InteractiveList'
import {getAllCategories} from '../actions/dataItem'






class HomePageContainer extends React.Component {
  constructor(props) {
    super(props)
    
    // this.state = {
    // }

  }

  
  componentDidMount() {
    let selectedNode = {
      Name : 'Home',
      path : '/home',
      type:'parent'
  
    }
    this.props.appendActivatedRoutes(selectedNode)
    this.props.getAllCategories()
  }


  componentWillReceiveProps(nextProps){
    
    
  
  if(this.props.isItemDeleted === false && this.props.isItemDeleted !== nextProps.isItemDeleted){
    this.props.getAllCategories()
        }
    }
  

  setHomePage() {
    let buttonConfig = pageConfig.homePageConfig.buttonConfig
    let data = this.props.categoryData
   // ["Remote Controls", "Plastic Casings", "Power Supply","Mobile Charger", "Adapters"];
    
    return (
      <div>
        <InteractiveList 
          buttonConfig = {buttonConfig}
          data = {data}
          history = {this.props.history}
          pageName = "Category"

        />
      </div>
    )
  }
  render() {
    return (this.setHomePage())
  }
}



function mapStateToProps(state) {
  return {
    activatedRoutes : state.treeview.activatedRoutes,
    categoryData: state.dataItem.categoryData,
    
    isItemDeleted : state.dataItem.isItemDeleted
  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      getAllCategories: getAllCategories,
      
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(HomePageContainer)

