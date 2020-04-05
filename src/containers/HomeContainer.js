import React from 'react'
import styled from 'styled-components'
import {SideBar} from '../components'
import { Header } from '../components'
import { Footer } from '../components'
import { Sticky } from 'react-sticky'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BreadCrumb from '../components/BreadCrumbCutom'
import {appendActivatedRoutes} from '../actions/treeview'
import {closeDialogMsg} from '../actions/login'
import {getAllCategories} from '../actions/dataItem'


import SubmitDialog from '../components/Modal'

import { MetroSpinner } from 'react-spinners-kit'

const SideBarWrapper = styled.div`

  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
`


const WrapperDiv = styled.div`
  position: fixed;
  display: ${props => (props['show'] ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  z-index: 2;
`

const BeatLoaderWrapper = styled.div`
  left: 50% !important;
  position: fixed;
  top: 50%;
  z-index: 1;`

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
    if (
      window.location.pathname === '/' ||
      this.props.location.pathname === '/login'
    ) {
      this.props.history.push(`/login`)
    }  
  }

  componentWillReceiveProps(nextProps){
    let tokenData = localStorage.getItem('userToken')
    if(tokenData && nextProps.categoryData === undefined  && nextProps.isCategoryLoaded !== false){      
      this.props.getAllCategories()
    }
  }

  toggleModal() {
    this.props.closeDialogMsg()
  }

 
  handleActionClick = () => {
    this.props.closeUpdatedMsg()
  }
  handleRequestClose = () => {
    this.props.closeUpdatedMsg()
  }
  
  toggleSidebar() {
    this.props.toggleSidebar(false)
  }
  toggleModal() {
    this.props.closeDialogMsg()
  }

  getSideBarWrapper() {
    return <SideBarWrapper onClick={this.toggleSidebar} />
  }

  getSideBar(distanceFromTop) {
      return (
        <SideBar
          distanceFromTop={distanceFromTop}
          toggleSidebar={this.props.toggleSidebar}
          toggleModal={this.props.toggleModal}
          sidebarVisible={this.props.sidebarVisible}
          history={this.props.history}
          selectedTreeData={this.props.selectedTreeData}
          name={this.props.name}
          objectId={this.props.objectId}
          loadChildren={this.props.loadChildren}
        />
      )
  }

  showBeatLoader = () => {
    let {isItemDataLoaded, isCategoryLoaded, postItemDataSuccess} = this.props

    if(!isItemDataLoaded === false ||  isCategoryLoaded === false || postItemDataSuccess === false ){
      return (
      <BeatLoaderWrapper>
              <MetroSpinner color="#db3c5a" loading={true} />
            </BeatLoaderWrapper>)

    }
    else{
      
      return (
        <BeatLoaderWrapper>
                <MetroSpinner color="#db3c5a" loading={false} />
              </BeatLoaderWrapper>)

    }
  
  }
  
  render() {
   
    return (

      <div>{  window.location.pathname !== '/login'   ? (
        <div>
        <Header
          history={this.props.history}
        />
         <Sticky>
            {({
              style,
              isSticky,
              wasSticky,
              distanceFromTop,
              distanceFromBottom,
              calculatedHeight,
            }) => {
              return (
                <div>
                  {this.getSideBarWrapper()}
                  {this.getSideBar(-distanceFromTop + 60)}
                  {
                    <WrapperDiv
                      show={true}
                      onClick={this.showPopup}
                    />
                  }
                </div>
              )
            }}
          </Sticky>
          <BreadCrumb activatedRoutes = {this.props.activatedRoutes} 
          history = {this.props.history}
          />
          {this.props.isOpen && (
            <SubmitDialog
              id="submitDialogue_Home"
              show={this.props.isOpen}
              toggleModal={this.toggleModal}
              message={this.props.dialogConfig.message}
              closeHandler={this.props.closeDialogMsg}
              code={this.props.dialogConfig.message}
            />
          )}
          <div>
            {this.showBeatLoader()}
            
            </div>
          </div>
          ) : <div></div> 
        }
 
         
     

       
      
        </div>
      
    )
  }
}
function mapStateToProps(state) {
  return {
    activatedRoutes : state.treeview.activatedRoutes,
    isOpen: state.login.isOpen,
    dialogConfig : state.login.dialogConfig,
    isItemDataLoaded : state.dataItem.isItemDataLoaded,
    postItemDataSuccess: state.dataItem.postItemDataSuccess,
    isCategoryLoaded: state.dataItem.isCategoryLoaded,
    categoryData : state.dataItem.categoryData,
    isCategoryLoaded: state.dataItem.isCategoryLoaded



  }

}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(
    {
      appendActivatedRoutes:appendActivatedRoutes,
      closeDialogMsg:closeDialogMsg,
      getAllCategories:getAllCategories
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(HomeContainer)
//export default HomeContainer
