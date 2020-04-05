import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/global-styles.scss'
import '../styles/UserList.scss'
import {MdModeEdit, MdDeleteForever } from "react-icons/md";
import {Redirect } from 'react-router-dom'
import {MdLibraryAdd } from "react-icons/md";
import {Button} from 'react-bootstrap'
import image from '../image/image.jpeg'
import Divider from '@material-ui/core/Divider';
import profileImage from "../assets/no-img.png";
import addIcon from "../assets/add_icon.png";

function routeToAddUser(e,props, routePath) {
  props.history.push(routePath)
}

function getFormattedData(dateString){
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date(dateString)
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    return formatted_date


}

function renderImage(url) {
  let completeUrl = 'http://localhost:10010/' + url
  return (
   
      <img
      className = 'userProfileClass'
        id="profileImage"
        height="35px"
        width="35px"
        src={completeUrl}
        alt="Profile Image"
      />
     
  );
}

export default function UserList(props) {
    const uerData = props.data
    console.log('uerData'+JSON.stringify(uerData));
    const pageName = props.pageName

  return (
      <div class="container containerClass">
        <div class = "row rowClass">
        <div className = "col-xs-6 col-md-2 addUserButtonDiv" onClick={(e) => routeToAddUser(e, props ,'/users/new/user')}>
        <img id="img_plus_icon" className="add-user-icon" src={addIcon} alt="plus logo" />
    <span className="add-user-text"> Add User </span> </div>
          </div>
        <div class = "row userListHeader rowClass">
          <div>
        <div className = {"col-xs-12 col-md-3" }>
        <div className='userListElementsHeader' >
         <p id = "user_name_header" className= "headernameStyle"> NAME
          </p>
          </div>
      </div>
      <div className = {"col-xs-12 col-md-2" }>
        <div className='userListElementsHeader' >
         <p  id = "user_id_header" className= "headernameStyle"> STATUS
          </p>
          </div>
      </div>
      <div className = {"col-xs-12 col-md-2" }>
        <div className='userListElementsHeader' >
         <p id = "role_header" className= "headernameStyle">  USER ID
          </p>
          </div>
      </div>
      <div className = {"col-xs-12 col-md-2" }>
        <div className='userListElementsHeader role' >
         <p id ="status_header"className= "headernameStyle"> ROLE
          </p>
          </div>
      </div>
      <div className = {"col-xs-12 col-md-2" }>
        <div className='userListElementsHeader role' >
         <p id ="status_header"className= "headernameStyle"> CREATED DATE
          </p>
          </div>
      </div>
</div>
</div>
  <div class="row rowClass">
    <div class="col-xs-12 col-md-12">
        <ul>
    {
      uerData && uerData.length > 0 && uerData.map((user) =>
      <div>
      <div className = "row user-list-row-theme" >
    <div className = "col-xs-3 col-md-3">
        <div className='userListElements' >
        {renderImage(user.profilepicurl)}
         <p id = {'user_name_' + user.Name} className= "userStyle"> {user.fullname}
          </p>
          </div>
      </div>
      <div className = "col-xs-3 col-md-2">
        <div className='userListElements' >
         <p id = {'user_id_' + user.isactive} className= {`userStatus text-center ${user.isactive ? "active" : "inactive"}`}> {user.isactive ? "active" : "inactive"}
          </p>
          </div>
      </div>
      <div className = "col-xs-3 col-md-2">
        <div className='userListElements' >
         <p  id = {'user_role_' + user.UserId} className= "userStyle "> {user.username}
          </p>
          </div>
      </div>
      <div className = "col-xs-3 col-md-2">
        <div className='userListElements' >
         <p id = {'user_status_' + user.Role} className= "userStyle "> {user.roleName}
          </p>
          </div>
      </div>
      <div className = "col-xs-3 col-md-2">
        <div className='userListElements' >
         <p id = {'user_createdDate_' + user.createddate} className= "userStyle"> {getFormattedData(user.createddate)}
          </p>
          </div>
      </div>
       </div>
            <Divider className="user-list-divider" />
            </div>
       ) }
        </ul>
    </div>
  </div>

</div>

  );
}
