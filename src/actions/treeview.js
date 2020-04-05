import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  UPDATE_ACTIVE_NODE,
  GET_STATE_DATA,
  GET_STATE_DATA_ERROR,
  GET_BRAND_DATA,
  GET_BRAND_DATA_ERROR,
  TREE_VIEW_SELECTED_NODE,
  GET_LIVE_ENTITY_DATA,
  GET_LIVE_ENTITY_DATA_LOADING,
} from '../constants/ActionTypes'


export const getStateDataSuccess = createAction(
  GET_STATE_DATA
)

export const getBrandDataSuccess = createAction(
  GET_BRAND_DATA
)

export const getBrandDataError = createAction(
  GET_BRAND_DATA_ERROR
)

export const appendActivatedRoutesSuccess = createAction(
  UPDATE_ACTIVE_NODE
)


export function appendActivatedRoutes(newRoutes) {
  return (dispatch, getState) => {
    dispatch(appendActivatedRoutesSuccess(newRoutes))  
  }

  
}

var Usertoken = JSON.parse(localStorage.getItem('userToken'))
if(Usertoken && Usertoken.token){
  let token = Usertoken.token
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
} else {
    axios.defaults.headers.common['authorization'] = null;
    /*if setting null does not remove `Authorization` header then try     
      delete axios.defaults.headers.common['Authorization'];
    */
}

}


export function getBrandData() {
  return (dispatch, getState) => {
   // dispatch(getA())
    axios.get(`http://localhost:10010/lripl/api/getBrandData`)
    .then(res => {
      dispatch(getBrandDataSuccess(res.data))
    },
    err => {      
      dispatch(getBrandDataError())
    })
    
}
}
export function getStateData() {
  return (dispatch, getState) => {
   // dispatch(getA())
    axios.get(`http://localhost:10010/lripl/api/getStateData`)
    .then(res => {
      dispatch(getStateDataSuccess(res.data))
    },
    err => {      
//      dispatch(getAllCategoriesError())
    })
    
}
}