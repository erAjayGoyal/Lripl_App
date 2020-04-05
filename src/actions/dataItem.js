import { createAction } from 'redux-actions'
import axios from 'axios'
import {
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_ERROR,
  GET_CATEGORY_DATA_LOADING, 
  POST_ITEM_DATA,
  POST_ITEM_DATA_ERROR,
  POST_ITEM_DATA_LOADING,   
  OPEN_DIALOG_MODAL,
  GET_CHILD_ENTITY,
  GET_CHILD_ENTITY_LOADING,
  GET_CHILD_ENTITY_ERROR,
  
  POST_BRAND_DATA,
  POST_BRAND_DATA_ERROR,
  POST_BRAND_DATA_LOADING,  

  DELETE_ITEM_DATA_ERROR,
  DELETE_ITEM_DATA_LOADING,
  DELETE_ITEM_DATA,
  ADD_EDIT_ITEM_DATA
} from '../constants/ActionTypes'
import apiRoute from '../constants/apiRoute'

export const postItemDataSuccess = createAction(
  POST_ITEM_DATA
)
export const postItemDataLoading = createAction(
  POST_ITEM_DATA_LOADING
)
export const postItemDataError = createAction(
  POST_ITEM_DATA_ERROR
)
export const deleteItemSuccess = createAction(
  DELETE_ITEM_DATA
)
export const deleteItemLoading = createAction(
  DELETE_ITEM_DATA_LOADING
)
export const deleteItemError = createAction(
  DELETE_ITEM_DATA_ERROR
)
export const openDialogMsg = createAction(
  OPEN_DIALOG_MODAL
)
export const getAllCategoriesSuccess = createAction(
  GET_CATEGORY_DATA
)
export const getAllCategoriesLoading = createAction(
  GET_CATEGORY_DATA_LOADING
)
export const getAllCategoriesError = createAction(
  GET_CATEGORY_DATA_ERROR
)

export const getChildEntityDataSuccess = createAction(
  GET_CHILD_ENTITY
)
export const getChildEntityDataLoading = createAction(
  GET_CHILD_ENTITY_LOADING
)
export const getChildEntityDataError = createAction(
  GET_CHILD_ENTITY_ERROR
)

export const postBrandDataSuccess = createAction(
  POST_BRAND_DATA
)
export const postBrandDataLoading = createAction(
  POST_BRAND_DATA_LOADING
)
export const postBrandDataError = createAction(
  POST_BRAND_DATA_ERROR
)
export const addEditItemInStateSuccess = createAction(
  ADD_EDIT_ITEM_DATA
)


export function addEditItemInState(editableData) {
  return (dispatch, getState) => {
    dispatch(addEditItemInStateSuccess(editableData))
    
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

export function getAllCategories() {
  return (dispatch, getState) => {
    
    dispatch(getAllCategoriesLoading())
    axios.get(`http://localhost:10010/lripl/api/allCatefories`)
    .then(res => {
      dispatch(getAllCategoriesSuccess(res.data))
    },
    err => {      
      dispatch(getAllCategoriesError())
    })
    
}
}

export function postItemData(itemData, itemIdentifier) {
  return (dispatch, getState) => {    
    dispatch(postItemDataLoading())
    let postMethod = apiRoute.add[itemIdentifier]
    console.log('this is post', apiRoute)
    console.log('postItemData', JSON.stringify(itemData))
    axios.post(
      `http://localhost:10010/lripl/api/${postMethod}`,
      itemData,     
      )
    .then(res => {
      console.log('success', res.data);
      let dialogConfig = {
        message:  res.data,
        statusCoe : 200
      }
      dispatch(openDialogMsg(dialogConfig))      
      dispatch(postItemDataSuccess())
    },
    (err ,error)=> {
      console.log('error', JSON.stringify(error));
      let dialogConfig = {
        message:  error.message,
        statusCoe : 500
      }
            
      dispatch(openDialogMsg(dialogConfig))  
      dispatch(postItemDataError())
      

      
    }).catch(err=>{
      console.log(err)
    })
    
}
}

export function updateItemData(itemData, itemIdentifier) {
  return (dispatch, getState) => {    
    dispatch(postItemDataLoading())
    let url = ``
    if(itemIdentifier === 'Product'){
      url = `http://localhost:10010/lripl/api/putProduct`
    }
    else{
      url = `http://localhost:10010/lripl/api/putEntityData?type=${itemIdentifier}`
    }
    axios.put(
      url,
      itemData,     
     )
    .then(res => {
      console.log('success', res.data);
      let dialogConfig = {
        message:  res.data,
        statusCoe : 200
      }
      dispatch(openDialogMsg(dialogConfig))      
      dispatch(postItemDataSuccess())
    },
    (err ,error)=> {
      console.log('error', JSON.stringify(error));
      let dialogConfig = {
        message:  error.message,
        statusCoe : 500
      }
            
      dispatch(openDialogMsg(dialogConfig))  
      dispatch(postItemDataError())
      

      
    }).catch(err=>{
      console.log(err)
    })
    
}
}

export function callDeleteApi(itemData) {
  return (dispatch, getState) => {    
    dispatch(deleteItemLoading())
    axios.post(
      `http://localhost:10010/lripl/api/deleteEntity`,
      itemData,     
      )
    .then(res => {
      console.log('success', res.data);
      let dialogConfig = {
        message:  res.data,
        statusCoe : 200
      }
      dispatch(openDialogMsg(dialogConfig))      
      dispatch(deleteItemSuccess())
    },
    (err ,error)=> {
      console.log('error', JSON.stringify(error));
      let dialogConfig = {
        message:  error.message,
        statusCoe : 500
      }
            
      dispatch(openDialogMsg(dialogConfig))  
      dispatch(deleteItemError())
      

      
    }).catch(err=>{
      console.log(err)
    })
    
}
}



export function postNewBrand(brandData) {
  return (dispatch, getState) => {    
    dispatch(postBrandDataLoading())
    axios.post(
      `http://localhost:10010/lripl/api/addBrand`,
      brandData,     
      )
    .then(res => {
      let dialogConfig = {
        message:  res.data,
        statusCoe : 200
      }
      dispatch(openDialogMsg(dialogConfig))      
      dispatch(postBrandDataSuccess())
    },
    (err ,error)=> {
      let dialogConfig = {
        message:  error.message,
        statusCoe : 500
      }
            
      dispatch(openDialogMsg(dialogConfig))  
      dispatch(postBrandDataError())
      

      
    }).catch(err=>{
      console.log(err)
    })
    
}
}


export function getChildEntityData(entity, queryParam) {
  return (dispatch, getState) => {
    dispatch(getChildEntityDataLoading())
    let getMethod = apiRoute.get[entity]
    axios.get(`http://localhost:10010/lripl/api/${getMethod}?`+ queryParam )
    .then(res => {
      let config = {
        data : res.data,
        entity,
      }
      dispatch(getChildEntityDataSuccess(config))
    },
    err => {      
      dispatch(getChildEntityDataError())
    })
    
}
}





