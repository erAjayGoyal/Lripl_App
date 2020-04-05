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
import { validate } from '@babel/types'



function validateUser(userObj){
  let isAuthenticated = false;
  if(userObj.message && userObj.message === 'Auth Pass'){
    isAuthenticated = true

  }
  return isAuthenticated
}

export default function login(state = [], action) {
  switch (action.type) {
    case SET_LOGIN_RESPONSE:
      var isAuthenticated = validateUser(action.payload)
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        userDetails:action.payload.userInfo[0],
        roles:action.payload.roles,
        isloginDone : true
      }
      case SET_USER_NOT_AUTH:
        return {
          ...state,
          isAuthenticated: false
        }
    case SET_LOGIN_RESPONSE_LOADING:
      return {
        ...state,
        isloginDone : false
      }
    case SET_LOGIN_RESPONSE_ERROR:
    return {
      ...state,
      isloginDone : true
    }
    case POST_USER_DATA_SUCCESS:
       // console.log('this is act', state.itemData)
        
        //var isAuthenticated = validateUser(action.payload)
        return {
          ...state,
          isUserAddedLoading: false
        }
    case OPEN_DIALOG_MODAL:
      // console.log('this is act', state.itemData)
        
        //var isAuthenticated = validateUser(action.payload)
        return {
          ...state,
          isOpen: true,
          dialogConfig : action.payload
        }
    case CLOSE_DIALOG_MODAL:
      // console.log('this is act', state.itemData)
        
        //var isAuthenticated = validateUser(action.payload)
        return {
          ...state,
          isOpen: false,
          //dialogMessage : action.payload
        }
      case GET_ALL_USERS:
         return {
            ...state,
            userData: action.payload,
            isUserLoaded : true
          }
      case GET_ALL_USERS_LOADING:
        return {
            ...state,
            isUserLoaded : false
          }
      case GET_ALL_USERS_ERROR:
      return {
          ...state,
          isUserLoaded : true
        }


        
    default:
      return state
  }

}

