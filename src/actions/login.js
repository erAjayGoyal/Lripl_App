import { createAction } from 'redux-actions'
import axios from 'axios'

import {SET_LOGIN_RESPONSE,
  SET_LOGIN_RESPONSE_ERROR,
  SET_LOGIN_RESPONSE_LOADING,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_LOADING,
  POST_USER_DATA_ERROR,
  OPEN_DIALOG_MODAL,
  CLOSE_DIALOG_MODAL,
  GET_ALL_USERS,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_ERROR,
  SET_USER_NOT_AUTH
} from '../constants/ActionTypes'

import {
  USER_CREATION_SUCCESS_MESSAGE
} from '../constants/messages'
import { create } from 'jss'

export const logInSuccess = createAction(
  SET_LOGIN_RESPONSE
)
export const logInLoading = createAction(
  SET_LOGIN_RESPONSE_LOADING
)
export const logInError = createAction(
  SET_LOGIN_RESPONSE_ERROR
)
export const postUserDataSuccess = createAction(
  POST_USER_DATA_SUCCESS
)
export const postUserDataLoading = createAction(
  POST_USER_DATA_LOADING
)
export const postUserDataError = createAction(
  POST_USER_DATA_ERROR
)
export const openDialogMsg = createAction(
  OPEN_DIALOG_MODAL
)
export const closeDialogMsg = createAction(
  CLOSE_DIALOG_MODAL
)


export const getAllUsersSuccess = createAction(
  GET_ALL_USERS
)

export const getAllUsersError = createAction(
  GET_ALL_USERS_ERROR
)

export const getAllUsersLoading = createAction(
  GET_ALL_USERS_LOADING
)

export const setNotAuthUser = createAction(
  SET_USER_NOT_AUTH
)
function setAuth () {
  var Usertoken = JSON.parse(localStorage.getItem('userToken'))
  if(Usertoken && Usertoken.token){
    let token = Usertoken.token
    if (token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`
  } else {
      axios.defaults.headers.common['authorization'] = null;
      /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }

  }
  
}





export function postGetuserInfo(dispatch, getState,userObj) {

    
    dispatch(logInLoading())
    axios.post(`http://localhost:10010/lripl/api/getUserInfo?username=${userObj}`, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(loginRes => {
        
        if(loginRes){

        

       dispatch(logInSuccess(loginRes.data))
        }
        
      // dispatch(logInSuccess(loginRes.data))
      },loginErr => {
        
      dispatch(logInError())
      if (loginErr.message.indexOf('403') > 1) {
        dispatch(setNotAuthUser())
      }
        if (loginErr.message === 'Network Error') {
        }
      }    
      
      )   
  

}

export function setTokenAndUserDetailsInlocalStorag(data) {

  if(data.token){
    localStorage.setItem("userToken" , JSON.stringify(data))
setAuth()


}}

export function postLoginData(userObj) {
  return (dispatch, getState) => {
    
    dispatch(logInLoading())
    axios.post(`http://localhost:10010/lripl/api/login`, userObj )
      .then(loginRes => {
        if(loginRes.data){
          

        
          setTokenAndUserDetailsInlocalStorag(loginRes.data)

          postGetuserInfo(dispatch, getState, userObj.userName)
        }
        
      },loginErr => {
        
      dispatch(logInError())
      if (loginErr.message.indexOf('403') > 1) {
        dispatch(setNotAuthUser())
      }
      }    
      
      )   
    
}
}

export function postNewUser(userObj) {
  return (dispatch, getState) => {
    axios.post(`http://localhost:10010/lripl/api/addUser`, userObj )
      .then(userRes => {

      let dialogConfig = {
        message:  USER_CREATION_SUCCESS_MESSAGE,
        statusCoe : 200

      }
      dispatch(openDialogMsg(dialogConfig))
      dispatch(postUserDataSuccess(userRes.data))
      

      },userErr => {
        if (userErr.message === 'Network Error') {
          // Result.statusCode = urlConstant.statusCode.fail
          // Result.successMessage =
          //   'Network Error Occured. Please try again after some time.'
          // dispatch(openDialogMsg())
        }
        // dispatch(getLogsError({ msg: res.message, res }))
      }    
      
      )   
    
}
}


export function getUsers() {
  return (dispatch, getState) => {
    dispatch(getAllUsersLoading())
    axios.get(`http://localhost:10010/lripl/api/allUsers`)
    .then(res => {
      dispatch(getAllUsersSuccess(res.data))
    },
    err => {      
      dispatch(getAllUsersError())
    })
    
}
}
