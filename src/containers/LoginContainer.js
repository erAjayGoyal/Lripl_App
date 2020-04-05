import React from 'react'
import { Button, Grid, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { SubmitDialog } from '../components'
import appconfig from '../config/appconfig'
import { LoginStyle } from '../styles/Login'
import logo from '../assets/lripl_logo_new.png'
import pedal_logo from '../assets/pedal_icon.png'
import {postLoginData} from '../actions/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {MdCancel} from "react-icons/md";


import { MetroSpinner } from 'react-spinners-kit'


const BeatLoaderWrapper = styled.div`
position: absolute;
margin-left: 10px;
  z-index: 1;`


class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
    this.userName = sessionStorage.getItem('name')
    this.state = {
      isInValid: false,
      isOpen: false,
      userId : '',
      passWord:''
    }
   
    this.onClickLogin = this.onClickLogin.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  onClickLogin = () => {
    let userId = this.state.userId
    let passWord = this.state.passWord
    let userObj = {
      userName: userId,
      password: passWord
    }
    this.props.postLoginData(userObj)
    // if(userId === 'admin' && passWord === '12345'){
    //   var url = '/home'
    //  // this.props.history.push(url)
    //                 window.location.href = url
    // }else{

    // }

    //window.sessionStorage.setItem('EmailId', this.refs.email_id.value)
    //window.authContext.login()
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.userDetails !== undefined && this.props.userDetails !== nextProps.userDetails){
      let userDetails = nextProps.userDetails
      sessionStorage.setItem('userInfo', JSON.stringify(userDetails))
    }
    if(nextProps.roles !== undefined && this.props.roles !== nextProps.roles){
      let roles = nextProps.roles
      sessionStorage.setItem('roles', JSON.stringify(roles))
    }
    if(nextProps.isAuthenticated !== this.props.isAuthenticated){
      if(nextProps.isAuthenticated){
        var url = '/home'
        window.location.href = url 
      } 
    }

  }




  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  handleKeyPress = (evt, inputField) => {
    console.log('this is event value', evt.value)

    let value = evt.target.value
    if(value){
      this.setState({
        [inputField] : value
      })
    }
  }

  loadingButton = (isLoginDone) => {

    if(isLoginDone === false){
      return true
    }
    return false

  }

  componentDidMount(){
    document.getElementById('router').style.borderStyle = 'none'
    
    document.getElementById('router').style.zIndex = -1;
  }
  render() {
    return (
      <LoginStyle>
        {!this.userName && (
          <Grid id="grid_Login">
            <Row>
              <div className="tableLogin">
                <fieldset>
                <div id = "name_company" className="login_headers">Admin Log in </div>
                <hr className="hr"/>
                     
                      <div className="login_headers">
                      <img id="img_header_logo"  height = '55px' width = '170px' src={logo} alt="Company logo" />
                  
                      </div>

                      {this.props.isAuthenticated === false && 
                      <div className = "incorect_details">
                    
                        <span> Incorrect Username or Password

                          </span>
                        </div>}
                  <table id="tbl_tableLogin_Login" className="table login">
                    <thead id="thead_tableLogin_Login">
                   
                    </thead>
                    <tbody id="tbody_tableLogin_Login">
                      <tr>
                        <td id="tbl_td_email_Login">Username</td>
                        <td className="paddbottom20"> 
                          <input
                            type="text"
                            onChange={(e) => {this.handleKeyPress(e, 'userId')}}
                            ref="user_id"
                            className="form-control"
                            placeholder="username"
                            id="txtUserID"
                          />
                        </td>
                      </tr>
                      <tr>
                        
                      <td id="tbl_td_email_Login">Password</td>
                        <td>
                         <input
                            type="text"
                            onChange={(e) => {this.handleKeyPress(e, 'passWord')}}
                            ref="password"
                            className="form-control"
                            placeholder="password"
                            id="txtPassword"
                          />
                        </td>
                      </tr>
                      
                                             
                      
                    </tbody>
                  </table>
                  <div className="btncenter">
                          
                          <Button
                            bsStyle="button-class"
                            bsSize="small"
                            id="btnSignin"
                            className="button-class"
                            onClick={() => {
                              this.onClickLogin()
                            }}
                          >
                            <span>
                            <BeatLoaderWrapper>
              <MetroSpinner size = {20} color="whitesmoke" loading={this.loadingButton(this.props
                .isloginDone)} />
            </BeatLoaderWrapper>
            </span>
            <span>
                            Log in
                            </span>
                          </Button>
                          
                        </div>
 
                </fieldset>
              </div>
             
            </Row>
          </Grid>
        )}
      </LoginStyle>
    )
  }
}



function mapStateToProps(state) {
  return {
  //  activatedRoutes : state.treeview.activatedRoutes,
    isAuthenticated: state.login.isAuthenticated,
    userDetails: state.login.userDetails,
    roles: state.login.roles,
    isloginDone : state.login.isloginDone
  }
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      postLoginData : postLoginData

    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(LoginContainer)


