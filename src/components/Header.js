import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, Table, Overlay, Tooltip } from 'react-bootstrap'
import SideBar from './Sidebar'
import { Sticky } from 'react-sticky'
import AppConfig from '../config/appconfig'
import logo from '../assets/lripl_logo_new.png'
const profile = 'images/users/default.png'


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
  height: 80px;
  width: 100%;
  box-shadow: 0 4px 12px 0 rgba(255, 255, 255, 0.05);

  background-color: #bcbaba1f !important;

  .userLabel{
    
    float: right;
    margin-right: 35px;
    font-size: 13px;
    margin-top: 20px;
  }
  .setUserInfo{
margin-bottom:0px
  }

  .headerBarWrapper {
    position: fixed;
    top: 0px;
    z-index: 27;
    width: 100%;
    height: 55px;


    /* Portrait and Landscape iPhone 6, 6S, 7 and 8 */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
      z-index: 2;
    }

    /* Portrait Iphone X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      z-index: 2;
    }
    /* Portrait and Landscape iPhone 5, 5S, 5C and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
      z-index: 2;
    }
    /* Landscape  iPhone 6+, 7+ and 8+ */
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      z-index: 2;
    }
  }
  .newClass {
    /* Portrait and Landscape iPhone 6, 6S, 7 and 8 */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
      z-index: 27;
    }

    /* Portrait Iphone X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      z-index: 27;
    }

    /* Portrait and Landscape iPhone 5, 5S, 5C and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
      z-index: 27;
    }

    /* Landscape  iPhone 6+, 7+ and 8+ */
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      z-index: 27;
    }
  }
  .logoClass {
    margin-left : 15px;
    margin-top : 8px;
    float: left;
  }
  .profileClass {
    margin-right: 10px;
    float: right;
    margin-left: 6px;
    border: 1px solid #bcbaba99;
    border-radius: 50%;
    margin-top: 15px;
}
  }
  .companyName {   
    padding-left: 91px;
    padding-top: 27px;
    font-size: 20px;
    font-weight: 500;
    color: #db3c5a
  }

  #lstUser {
    cursor: pointer;
  }
  .dropdown {
    position: relative !important;
    display: inline-block !important;
  }

  .dropdown-content {
    display: none;
    margin-left: -10px;
    // padding-right: 3.5rem;
    margin-top: 3rem;
    // position: absolute !important;
    left: 93.07%;
    top: 4%;
    padding-right: 4rem;
    position: absolute !important;
    background-color: #262626;
    color: white !important;
    min-width: 96px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
    // left: 93%;
  }

  .dropdown-content a {
    color: white;
    // padding: 12px 16px 12px 51px;
    padding: 12px 16px;
    text-decoration: none;
    display: block !important;
  }

  // .dropdown-content a:hover {
  //   background-color: #323232;
  // }

  .dropbtn {
    position: fixed !important;
  }

  .dropdown:hover .dropdown-content {
    display: block !important;
  }

  .handleUserName {
    max-width: 120px;
    @media (max-width: 460px) {
      display: none;
    }
    @media (max-width: 900px) {
      max-width: 100px;
    }
  }
  .right-nav ul {
    list-style-type: none;
    margin: 0;
    display: -webkit-inline-flex;
    padding: 0;
    height: 42px;
  }
  .right-nav ul li {
    display: inline-block;
    padding: 10px;
    border-left: 1px solid #000;
    @media (max-width: 320px) {
      padding: 10px 5px;
    }
    @media (max-width: 270px) {
      padding: 10px 3px;
    }
    @media (max-width: 240px) {
      padding: 10px 1px;
    }
  }
  .right-nav {
    float: right;
    color: #eee;
    overflow: hidden;
    @media (max-width: 767px) {
      margin-right: 39px;
    }
    @media (min-width: 768px) {
      margin-right: 5px;
    }
  }
  .left-nav {
    float: left;
  }
  .abb-logo {
    @media (max-width: 320px) {
      padding: 10px 0px 0px 0px;
    }
    padding: 10px 0px 0px 0px;
    float: left;
  }
  .application-logo {
    color: #f7f7f7;
    padding: 10px 0px 0px 10px;
    @media (max-width: 767px) {
      display: none !important;
    }

    /* Landscape Iphone x*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      display: none !important;
    }

    /* Portrait  iPad 1, 2, Mini and Air */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
      display: none !important;
    }

    /* Portrait iPad 3, 4 and Pro 9.7 */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
      display: none !important;
    }
    min-width: 270px;
  }
  .right-nav .user {
    display: inline-block !important;
    overflow: hidden;
    @media (max-width: 767px) {
      display: none !important;
    }
  }
  .textClass {
    width: 100% !important;
    padding-top: 30px;
    max-width: 800px;
  }
  .buttontextClass {
    width: 100% !important;
    padding-top: 10px;
    max-width: 800px;
  }
  .buttontextClassAbout {
    width: 100% !important;
    max-width: 800px;
  }
  .custom-button-class {
    width: 100px;
    height: 30px;
    font-size: 12px;
    padding: 6px;
    border-radius: 0px;
    background-color: ##ededed;
    border: #d4d4d4 solid 1px;
    border-bottom: #8d8d8d solid 1px;
  }
  .tdSubmit {
    width: 100%;
    // margin-right: 5px;
    // padding-right: 8px;
  }
  .tdCancel {
    width: 100%;
    margin-right: 5px;
    padding-right: 8px;
  }
  .tr,
  td {
    padding: 10px 0px;
    line-height: 24px;
  }
  .btngroup {
    display: inline-flex;
    float: right;
  }
  .tableBordered {
    height: 10px;
  }
  .table-responsive {
    max-height: 300px;
    @media (max-width: 767px) {
      overflow: scroll;
    }
  }
  .button-class-submit {
    background-color: rgb(0, 150, 224) !important;
    border: rgb(0, 136, 204) solid 2px !important;
    color: white !important;
    width: 90px !important;
    height: 29px !important;
    border-radius: 0px;
    font-size: 13px !important;
    border-bottom: rgb(35, 110, 168) solid 1px !important;
    padding: 4px !important;
    margin-bottom: 0px;
    margin-top: 0px;
  }
  .button-class-submit:hover {
    background-color: rgb(10, 174, 255) !important;
    border: None !important;
  }
  .button-class-close {
    background-color: #ebebeb !important;
    border: #cdcdcd solid 2px !important;
    color: #141414 !important;
    width: 90px !important;
    height: 29px !important;
    border-radius: 0px;
    font-size: 13px !important;
    padding: 4px !important;
    margin-left: -8px;
    margin-top: 0px;
  }
  .button-class-close:hover {
    border: rgb(10, 174, 255) solid 2px !important;
  }
  .tdRefresh {
    float: right;
    padding-bottom: 10px;
  }
  .alignVerticalCenter {
    display: flex !important;
  }
  .tdClose {
    width: 5%;
    float: right;
    margin-top: -30px;
    margin-right: -10px;
  }
  .tableWidth {
    width: 100%;
  }
  .about {
    margin-bottom: 0px;
  }
  .button {
    width: 100px;
    height: 30px;
    font-size: 12px;
    padding: 6px;
  }
  .timeClass {
    font-size: 12px;
    color: gray;
  }
  .columnWidth {
    width: 35%;
  }
  .columnPadding {
    padding-left: 6px !important;
  }
  .overlay {
    background: rgba(0, 0, 0, 0.85);
    z-index: 10000;
  }
  .aboutIcon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .wellNotesIcon,
  .PASIcon,
  .logoutIcon {
    cursor: pointer;
  }
  .wordWrap {
    word-wrap: break-word;
    width: 300px;
  }
  .invert {
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      margin-bottom: 10px;
    }
  }
`
const LIWrapper = styled.li`
  @media (max-width: 767px) {
    display: none !important;
  }
`
const WrapperDiv = styled.div`
  position: fixed;
  display: ${props => (props['show'] ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  z-index: 2;
`
const DeviceStatus = styled.li`
  @media (max-width: 767px) {
    display: none;
  }
`

const LogOutWrapper = styled.li`
  @media (max-width: 350px) {
    padding-right: 8px !important;
  }
`
const MainWrapper = styled.div`
  &.tree-view {
    position: fixed;
    left: 0;
    //top: ${props => (props.dataTop ? `${props.dataTop}px` : '0px')};
    top: 41px;
    text-align: left;
    //width: 250px;
    z-index: 25;
    height: 100%;
    @media only screen and (min-device-width: 321px) and (max-device-width: 600px) {
      //iPhone6
      position: fixed;
      top: 40px !important;
    }
    @media only screen and (max-device-width: 321px) {
      //iPhone5
      position: fixed;
      top: 40px !important;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      position: fixed;
      top: 40px !important;
    }
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  getCurrentRole  = (roleId) => {

    let role = ""
    let availableRoles = JSON.parse(sessionStorage.getItem('roles'))
    if(availableRoles && availableRoles.length > 0)
{
  availableRoles.forEach(element => {
    if(element.roleid === roleId){
      role = element.name
    }
    
  });
}
return role
  }
  
  getTopBar() {
    let userDetails = {}
    userDetails =JSON.parse(sessionStorage.getItem('userInfo'))
    let role = this.getCurrentRole(userDetails.roleid)
    let isimgSrc = userDetails.profilepicurl !== undefined & userDetails.profilepicurl.length > 0
    let imgSrc = isimgSrc ? userDetails.profilepicurl : profile
    imgSrc = 'http://localhost:10010/' + imgSrc
    return (
      <TopBar>
     <div className= 'row'>

     <div className = "col-xs-6 col-md-6 ">
<img className = 'logoClass' id="img_header_logo"  height = '65px' width = '170px' src={logo} alt="Company logo" />
      <div className = "companyName"> LRIPL  Admin Portal</div>
      </div>
    <div className = "col-xs-6 col-md-6 ">
{userDetails && userDetails.fullname && 
<div> 
      <div className= "userLabel">
        <p className = "setUserInfo">
        {userDetails.fullname.charAt(0).toUpperCase() + userDetails.fullname.slice(1) }
        </p>
        
        <p className = "setUserInfo">
          
  {role}
        </p>
  </div>
  <img className = 'profileClass' id="img_header_logo"  height = '45px' width = '45px' src={imgSrc} alt="Company logo" />
  </div>
      }
  </div>
  
  
</div>
</TopBar>
    )
  }
  
  getSideBarWrapper() {
    if (this.props.sidebarVisible) {
      return <SideBarWrapper />
    }
  }

  getSideBar(distanceFromTop) {
    if (this.userName) {
      return (
        <SideBar
          distanceFromTop={distanceFromTop}
          toggleModal={this.props.toggleModal}
          history={this.props.history}
          name={this.props.name}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <TopBar>
          <div id="sideBarIdRef" className="headerBarWrapper">
            {this.getTopBar()}
          </div>
        
        </TopBar>
      </div>
    )
  }
}
export default Header

