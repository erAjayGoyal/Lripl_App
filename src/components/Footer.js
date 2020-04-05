import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, Table, Overlay, Tooltip } from 'react-bootstrap'
import SideBar from './Sidebar'
import { Sticky } from 'react-sticky'
import AppConfig from '../config/appconfig'
import logo from '../assets/lripl_logo_new.png'
import profile from '../assets/dummyUser.jpg'


const options = {
  timeout: 2000,
  position: 'bottom center',
}
const SideBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
`
const TopBar = styled.div`

  .userLabel{
    float: right;
    margin-top: 23px;
    margin-right: 20px;
    font-size: 23px;
  }
  .footerBar {
    position: fixed;
    bottom: 0px;
    z-index: 27;
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;

  }
  .setfotterContent{
    float: right;
    margin-right: 25px;
    text-align : right
  }
  .textStyle{
    margin-top : 12px;
    font-size: 11px;
  }

  `


class footer extends React.Component {
  constructor(props) {
    super(props)
  }
  
  getTopBar() {
    
    return (
      <TopBar>
     <div className= 'row'>
       <div className = "col-xs-12 col-md-3 setfotterContent">
<p className = "textStyle">Copyright © 2019 Lripl.com. All rights reserved</p>
</div>
  
  
</div>
</TopBar>
    )
  }
  
  

  render() {
    return (
      <div>
        <TopBar>
          <div id="sideBarIdRef" className="footerBar">
            {this.getTopBar()}
          </div>
        
        </TopBar>
      </div>
    )
  }
}
export default footer

