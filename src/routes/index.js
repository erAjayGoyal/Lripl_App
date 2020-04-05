import React, { Component } from 'react'
import axios from 'axios'
import {
  LoginContainer,
  HomeContainer,
  HomePageContainer,
  itemContainer,
  AddItemContainer,
  productContainer,
  UserContainer,
  AddUserContainer,
  brandContainer,
  AddBrandContainer
  } from '../containers'
import { Footer } from '../components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { StickyContainer } from 'react-sticky'
import { Grid, Row, Col, DropdownButton } from 'react-bootstrap'
import { connect } from 'react-redux'
import AuthenticationContext from '../utils/AuthenticationContext.js'

const Container = styled.div`
  text-align: left;
  .routerWrapper {    
    border-style: solid;
    border-width: 1px;
    position : fixed;
    top : 140px;
    left: 192px;
    right: 50px;
    z-index: 2;    
    height: 80%;
    overflow: auto !important;    
    border-color: #8080802b;
    @media (min-width: 767px) {
      padding-left: ${props => (props['sideBarVisible'] ? '0px' : '0px')};
      overflow: ${props => (props['sideBarVisible'] ? 'inherit' : 'inherit')};
    }
    @media (max-width: 767px) {
      padding-left: 0px !important;
    left: 63px;
    width: 100vh;
    }
  }
`

class Routes extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // var that = this
    // var EmailId = window.sessionStorage.getItem('EmailId')
    // if (EmailId === null) {
    //   EmailId = ''
    // }
    // window.config = {
    //   instance: process.env.REACT_APP_INSTANCE,
    //   tenant: process.env.REACT_APP_TENANT_ID,
    //   clientId: process.env.REACT_APP_CLIENT_ID,
    //   endpoints: {
    //     endpointUrl: process.env.REACT_APP_CLIENT_ID,
    //   },
    //   postLogoutRedirectUri: window.location.origin,
    //   redirectUri: process.env.REACT_APP_REDIRECT_URI,
    //   cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
    //   popUp: false,
    //   scope: 'authCode',
    //   callback: function(authCode) {
    //     that.props.dispatch(getLoginSessions(authCode))
    //   },
    //   loginHint: EmailId,
    // }
    // try {
    //   window.authContext = new AuthenticationContext(window.config)
    // } catch (e) {
    //   console.log('window.authContext: ', e)
    // }
  }
  render() {
    var styleSticyContainer = {
      marginLeft: '0px',
      overflowX: 'hidden',
      width: '100%',
      overflowY: 'hidden',
      height: '100%',
    }
    return (
      <StickyContainer>
        <Row style={styleSticyContainer}>
          <Router>
            <Container sideBarVisible={this.props.sidebarVisible}>
              {/* <Route path="/" component={HomeContainer} /> */}
              <Route path="/login" component={LoginContainer} />
              <Route path="" component={HomeContainer} /> 

              <div className="routerWrapper" id = "router">
               <Route
                  path="/home"
                  component={HomePageContainer}
                  exact={true}
                />
                <Route
                  path="/users"
                  component={UserContainer}
                  exact={true}
                />
                <Route
                  path="/users/new/user"
                  component={AddUserContainer}
                  exact={true}
                />
              <Route
                  path="/home/:mode/:itemName"
                  component={AddItemContainer}
                  exact={true}
                />
                 <Route
                  path="/home/products/:catName"
                  component={productContainer
                  }
                  exact={true}
                />
               
               <Route
                  path="/:itemName/:catName"
                  component={itemContainer}
                  exact={true}
                />
                 
                 <Route
                  path="/brands"
                  component={brandContainer}
                  exact={true}
                />

                  <Route
                  path="/brands/new/brand"
                  component={AddBrandContainer}
                  exact={true}
                />
                 
              

              </div>
              
            </Container>
            
          {window.location.pathname !== '/login' &&   <Footer />}
          </Router>
        </Row>
      </StickyContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}
function mapDispatchtoProps(dispatch) {
  return {
    dispatch,
  }
 }
export default connect(mapStateToProps, mapDispatchtoProps)(Routes)


//export default Routes

// export default Routes
