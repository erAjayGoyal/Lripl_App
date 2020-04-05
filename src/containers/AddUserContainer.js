import React from "react";
import { Button } from "react-bootstrap";
import "../styles/global-styles.scss";
import "../styles/addUser.scss";
import TextField from "../components/TextField";
import { MdAddCircleOutline, MdClose } from "react-icons/md";

import ImageUploader from "react-images-upload";
import { appendActivatedRoutes } from '../actions/treeview'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import EllipsisWithTooltipExt from "../components/EllipsisWithTooltipExt";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postNewUser } from "../actions/login";
import profile from '../assets/no-img.png'


class AddUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        fullName: "",
        userId: "",
        passWord: "",
        imageSrc: '',
        image: []
      }
    }

    this.roles = JSON.parse(sessionStorage.getItem('roles'))
    this.roleOptions = this.getRoleOptions(this.roles)

  }

  getRoleOptions = (roles) => {
    let role = []
    roles.forEach(element => {

      role.push(element.name)
    });
    return role
  }


  routeToParent = () => {
    this.props.history.goBack();
  };

  handleDropDownValue = (event, name) => {
    let { value } = event
    let { userData } = this.state
    userData[name] = value
    this.setState({
      userData: userData
    })

  }
  componentDidMount() {
    let itemCategory = this.props.match.params.itemName;
    let selectedNode = {
      Name: 'New User',
      path: '/users/new/user',
      type: 'child'
    }
    this.props.appendActivatedRoutes(selectedNode)
  }

  handleKeyPress = (event) => {
    console.log('event', event)
    let { name, value } = event.target
    let { userData } = this.state
    userData[name] = value
    this.setState({
      userData: userData
    })

  }


  onDropPic = (e) => {
    let picture = e.target.files
    if (picture && picture.length > 0) {
      let userData = this.state.userData
      if (picture && picture.length > 0) {

        let reader = new FileReader();

        reader.onloadend = () => {


          userData.image = picture
          userData.imageSrc = reader.result
          let newUserData = Object.assign({}, userData)
          this.setState({

            userData: newUserData

          });

        }


        reader.readAsDataURL(picture[0])
      }


    }

  };

  getRoleId = (role) => {
    let roleId = ''
    if (this.roles && this.roles.length > 0) {
      this.roles.forEach(elm => {
        if (elm.name === role) {
          roleId = elm.roleid
        }
      }
      )
    }
    return roleId

  }



  addUserDetails = () => {
    let { userData } = this.state
    if (userData) {
      var userObj = new FormData()
      let roleId = ''
      if (userData.role) {
        roleId = this.getRoleId(userData.role)
      }


      userObj.append('userId', userData.userId)
      userObj.append('fullName', userData.fullName)

      userObj.append('passWord', userData.passWord)
      userObj.append('role', roleId)

      userObj.append('status', userData.status)

      userObj.append('file', userData.image[0])
      this.props.postNewUser(userObj)
      this.setState({
        userData: {
          fullName: "",
          userId: "",
          passWord: "",
          imageSrc: '',
          image: []
        }
      })
    }
  }

  renderAddUser = () => {
    const optionsStatus = ['Active', "Inactive"]
    let isProfileUploaded = this.state.userData.image !== undefined && this.state.userData.image.length > 0,
      userProfilehelp = isProfileUploaded ? 'Change Photo' : 'Upload Photo',
      imageSrc = isProfileUploaded ? this.state.userData.imageSrc : profile
    return (
      <div class="container">
        <div class="row rowStyle rowSet">
          <div class="row">
            <div className="col-xs-12 col-md-12">
              <h3 className="heading">Add User</h3>
            </div>
          </div>
          <div className='row'>

            <div class="col-xs-6 col-md-6 col-md-offset-3">
              <div class="row">
                <div class="col-xs-6 col-md-12">
                  <div class="row blockTheme setFormContainer">
                    <div className="col-xs-12 col-md-12">
                      <form>

                        <div class="form-group row formLeftMargin">

                          <div class="col-xs-12 text-center">


                            <div class="image-upload">
                              <label for="file-input">
                                <img src={imageSrc} />
                                <p class="profilePicText">{userProfilehelp}</p>
                              </label>


                              <input id="file-input" type="file" onChange={e => this.onDropPic(e)} />
                              
                            </div>


                          </div>

                      
                        </div>









                        {this.state.userData.profilePic && this.state.userData.profilePic.length > 0 &&
                          <div class="form-group row formLeftMargin">
                            <div class="col-xs-4">

                              <EllipsisWithTooltipExt placement="top">
                                Profile Photo
                          </EllipsisWithTooltipExt>
                            </div>
                            <div class="col-xs-8">
                              <input
                                type="file"

                              />
                            </div>
                          </div>}
                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">

                            <EllipsisWithTooltipExt placement="top">
                              Full Name
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">
                            <TextField
                              className="textField"
                              id={"full_name"}
                              type="text"
                              placeholder='Enter Full Name'
                              name="fullName"
                              //onKeyPress={this.isNumber}
                              //  value={this}
                              onChange={(e) => { this.handleKeyPress(e) }}

                            />
                          </div>
                        </div>
                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">
                            <EllipsisWithTooltipExt placement="top">
                              User Id
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">
                            <TextField
                              className="textField"
                              id={"User_Id"}
                              type="text"
                              placeholder='Enter User Id'
                              //onKeyPress={this.isNumber}
                              onChange={(e) => { this.handleKeyPress(e) }}
                              name="userId"

                              value={this.state.userData.userId}

                            />
                          </div>
                        </div>
                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">
                            <EllipsisWithTooltipExt placement="top">
                              Password
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">
                            <TextField
                              className="textField"
                              id="psd"
                              type="text"
                              //onKeyPress={this.isNumber}                            
                              placeholder='Enter Password'
                              onChange={(e) => { this.handleKeyPress(e) }}
                              name="passWord"
                              value={this.state.userData.passWord}

                            />
                          </div>
                        </div>
                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">
                            <EllipsisWithTooltipExt placement="top">
                              Role
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">

                            <Dropdown options={this.roleOptions}
                              onChange={(e) => { this.handleDropDownValue(e, 'role') }}
                              value={this.state.userData.role}
                              placeholder="Select"
                              name="role"
                            />

                          </div>
                        </div>

                        <div class="form-group row formLeftMargin">
                          <div class="col-xs-4">
                            <EllipsisWithTooltipExt placement="top">
                              Status
                          </EllipsisWithTooltipExt>
                          </div>
                          <div class="col-xs-8">

                            <Dropdown
                              onChange={(e) => { this.handleDropDownValue(e, 'status') }}
                              name='status'
                              value={this.state.userData.status}
                              options={optionsStatus} placeholder="Select" />


                          </div>
                        </div>



                        <div class="form-group row">
                          <div class="col-md-offset-6 col-xs-2 customMargin">
                            <Button
                              bsStyle="button-class"
                              bsSize="small"
                              id={"cancel_item"}
                              className="button button-class buttonFloat"
                              onClick={e => this.addUserDetails()}
                            >
                              <span className='btnIcon'>
                                <MdAddCircleOutline />
                              </span>
                              <span lassName='btnTxt'>
                                Add
                            </span>
                            </Button>
                          </div>
                          <div class="col-xs-2">
                            <Button
                              bsStyle="button-class"
                              bsSize="small"
                              id={"add_item"}
                              className="button buttonClassCancel buttonFloat "
                              onClick={e => this.routeToParent()}>
                              <span className='btnIcon'>
                                <MdClose />
                              </span>
                              <span lassName='btnTxt'>
                                Cancel
                            </span>


                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    return (<div>{this.renderAddUser()}</div>
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
      postNewUser: postNewUser,
      appendActivatedRoutes: appendActivatedRoutes
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddUserContainer)

