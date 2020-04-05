/* eslint-disable no-unused-expressions */
import React from 'react'
import styled from 'styled-components'
//import { LighthouseMenu } from '../components'
import { Styles } from '../styles/Sidebar'
import { Tooltip, OverlayTrigger, Overlay } from 'react-bootstrap'
import { MdHome, MdBorderAll, MdArrowBack, MdArrowForward, MdPeople, MdDescription, MdDesktopWindows, MdRecordVoiceOver } from "react-icons/md";
import pageConfig from '../constants/pageConfig'
import { element } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appendActivatedRoutes } from '../actions/treeview'
import LogoutDialog from './LogoutDialog'

const MainWrapper = styled.div`

  font-feature-settings: 'liga';
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

class SideBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleViewSidebar = this.handleViewSidebar.bind(this)
    this.mainplacement = 'right'
    this.placement = 'right'
    let activeId = window.location.pathname.split('/')[1] + '_link'
    this.state = {
      sideBarOpen: true,
      activeId: activeId,
      isShowDialog: false
    }
    //document.getElementById(this.state.activeId).style.color = 'black';

  }

  componentDidMount() {
    let targetElm = document.getElementById(this.state.activeId)
    if (targetElm) {
      targetElm.style.color = '#db3c5a';
    }
  }







  handleSideNav = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      isPas: false,
      isLighthouse: false,
      isDeviceManagement: false,
    })
  }



  handleViewSidebar() {
    this.props.toggleSidebar(!this.props.sidebarVisible)
    //this.props.toggleSidebar(!this.state.isLighthouse)
    this.setState({
      isLighthouse: !this.state.isLighthouse,
      isPas: false,
      isDeviceManagement: false,
    })
  }


  getSideView = () => {
    return (
      <div
        id="sidepanel"
        onMouseOut={e => this.mouseOut(e)}
        onMouseOver={e => this.mouseOver(e)}
      >


      </div>
    )
  }

  renderIcon = (iconName) => {
    var customTag = iconName;
    return (
      <customTag />
    )
  }


  toogleSideBar = () => {
    let sideBarOpen = this.state.sideBarOpen
    if (sideBarOpen) {
      var elment = document.getElementsByTagName("a")

      for (let i = 0; i < elment.length; i++) {
        elment[i].style.display = 'none'
      }

    }
    else {
      var elment = document.getElementsByTagName("a")
      for (let i = 0; i < elment.length; i++) {
        elment[i].style.display = 'inherit'
      }
    }
    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    })

  }

  afterSetStateFinished = () => {
    let id = this.state.activeId
    let targetElm = document.getElementById(id);
    if (targetElm) {
      targetElm.style.color = '#db3c5a';
    }
  }

  handleLogout = () => {
    this.setState({ isShowDialog: true })
  }

  closeLogoutDialog = () => {
    console.log('sidebar dialog CLOSE ACTION');
    this.setState({ isShowDialog: false })
  }

  doUserLogout = () => {
    sessionStorage.removeItem('userInfo')
    sessionStorage.removeItem('roles')
    localStorage.removeItem('userToken')
    window.location.href = '/login'
    this.setState({ isShowDialog: false })
  }



  handleIconClick = (e, path, id) => {
    let targetElm = document.getElementById(this.state.activeId)
    if (targetElm) {
      targetElm.style.color = 'white';
    }

    let selectedNode = {
      Name: path.split('/')[1],
      path: path,
      type: 'parent'

    }
    this.props.appendActivatedRoutes(selectedNode)


    this.setState({
      activeId: id
    }, () => {
      this.afterSetStateFinished();
    });
    this.props.history.push(path)
  }
  getSideBar = () => {
    const sideBarRoutes = pageConfig.routes
    let sideBarOpen = this.state.sideBarOpen
    let iconName = sideBarOpen ? <MdArrowBack /> : <MdArrowForward />



    return (
      <Styles>
        <div id="maindiv">
          <div class="list-group side-nav-block custom" id="list-tab" role="tablist">


            <div class="sidebar_item">
              <span className="spanStyleIcon Arrow" onClick={(e) => this.toogleSideBar()}>
                {iconName}
              </span>
              <span className="spanStyle">
                <div> </div>
              </span>
            </div>
            <div class="sidebar_item" id='home_link'>
              <span className="spanStyleIcon">
                <MdHome id='home_icon' onClick={e => this.handleIconClick(e, '/home', 'home_link')} />
              </span>
              <span className="spanStyle">
                <a onClick={e => this.handleIconClick(e, '/home', 'home_link')} className="aLinkstyle" id="home_label" >Home</a>
              </span>
            </div>

            <div class="sidebar_item">
              <span className="spanStyleIcon">
                <MdRecordVoiceOver />
              </span>
              <span className="spanStyle">
                <a className="aLinkstyle" id="list-enquiris" data-toggle="list" href='/enquires' role="tab" aria-controls="home">Enquiries</a>
              </span>
            </div>


            <div class="sidebar_item" id='brand_link'>
              <span className="spanStyleIcon">
                <MdBorderAll id='brand_icon' onClick={e => this.handleIconClick(e, '/brands', 'brand_link')} />
              </span>
              <span className="spanStyle">
                <a onClick={e => this.handleIconClick(e, '/brands', 'brand_link')} className="aLinkstyle" id="brand_label" >Brands</a>
              </span>
            </div>



            <div class="sidebar_item" id='users_link'>
              <span className="spanStyleIcon ">
                <MdPeople id='users_icon' onClick={e => this.handleIconClick(e, '/users', 'users_link')} />
              </span>
              <span className="spanStyle">
                <a className="aLinkstyle" id="users_label" onClick={e => this.handleIconClick(e, '/users', 'users_link')}>Users</a>
              </span>
            </div>




            {/* <div class="sidebar_item">
          <span className = "spanStyleIcon">
            <MdDescription />
          </span>
          <span className = "spanStyle">
        <a className="aLinkstyle" id="list-profile" data-toggle="list" href='/profile' role="tab" aria-controls="home">Profile</a>
            </span>
          </div> */}
            <div class="sidebar_item">
              <span className="spanStyleIcon">
                <MdDesktopWindows />
              </span>
              <span className="spanStyle">
                <a className="aLinkstyle" id="list-logout" onClick={this.handleLogout} data-toggle="list" role="tab" aria-controls="home">Logout</a>
              </span>
            </div>



          </div>
        </div>
      </Styles>
    )
  }

  render() {
    return (
      <MainWrapper className="tree-view" dataTop={this.props.distanceFromTop}>
        {this.getSideBar()}
        <LogoutDialog
          open={this.state.isShowDialog}
          negativeActionCallBack={this.closeLogoutDialog}
          positiveActionCallBack={this.doUserLogout}
          title={"Logout"}
          message={"Are you sure, you want to logout?"}
          positiveButtonText={"YES"}
          negativeButtonText={"NO"}
        />
      </MainWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    activatedRoutes: state.treeview.activatedRoutes
  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes: appendActivatedRoutes
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(SideBar)

