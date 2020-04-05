import React from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {appendActivatedRoutes} from '../actions/treeview'
import {getUsers} from '../actions/login'
import UserList from '../components/UserList'






class UserContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let selectedNode = {
      Name : 'Users',
      path : '/users',
      type:'parent'  
    }
    this.props.appendActivatedRoutes(selectedNode)
    this.props.getUsers()
  }

  

  setUser() {
    
   // let pageName = this.mapPageNamewithUserName(this.props.match.params.UserName)
    let data = this.props.userData
    
    return (
      <div>
        <UserList 
          data = {data}
          history = {this.props.history}

        />
      </div>
    )
  }

  render() {
    return (this.setUser())
  }
}

function mapStateToProps(state) {
  return {
    activatedRoutes : state.treeview.activatedRoutes,
    userData : state.login.userData
  }
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      getUsers : getUsers
    
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchtoProps)(UserContainer)
