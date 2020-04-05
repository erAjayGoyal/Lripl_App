
import {
  POST_ITEM_DATA,
  POST_ITEM_DATA_ERROR,
  POST_ITEM_DATA_LOADING,
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_ERROR,
  GET_CATEGORY_DATA_LOADING,  
  GET_CHILD_ENTITY,
  GET_CHILD_ENTITY_LOADING,

  GET_CHILD_ENTITY_ERROR,
  POST_BRAND_DATA,
  POST_BRAND_DATA_ERROR,
  POST_BRAND_DATA_LOADING,
  
  DELETE_ITEM_DATA,
  DELETE_ITEM_DATA_ERROR,
  DELETE_ITEM_DATA_LOADING,
  ADD_EDIT_ITEM_DATA
} from '../constants/ActionTypes'
import _ from 'lodash'




export default function dataItem(state = [], action) {
  switch (action.type) {
    case ADD_EDIT_ITEM_DATA:
      return {
        ...state,
        editItemData: action.payload
      }
    case POST_ITEM_DATA_ERROR:
      return {
        ...state,
        postItemDataSuccess: true
      }
    case POST_ITEM_DATA:
      return {
        ...state,
        postItemDataSuccess: true
      }
    case POST_ITEM_DATA_LOADING:
      return {
        ...state,
        postItemDataSuccess: false
      }
      case DELETE_ITEM_DATA_ERROR:
        return {
          ...state,
          isItemDeleted: false
        }
      case DELETE_ITEM_DATA:
        return {
          ...state,
          isItemDeleted: true
        }
      case DELETE_ITEM_DATA_LOADING:
        return {
          ...state,
          isItemDeleted: false
        }
    case POST_BRAND_DATA_ERROR:
      return {
        ...state,
        postBrandDataSuccess: true
      }
    case POST_BRAND_DATA:
      return {
        ...state,
        postBrandDataSuccess: true
      }
    case POST_BRAND_DATA_LOADING:
      return {
        ...state,
        postBrandDataSuccess: false
      }
    
    case GET_CATEGORY_DATA:
      return {
        ...state,
        isCategoryLoaded: true,
        categoryData: action.payload
      }
    case GET_CATEGORY_DATA_LOADING:
      return {
        ...state,
        isCategoryLoaded: false
      }
    case GET_CATEGORY_DATA_ERROR:
      return {
        ...state,
        isCategoryLoaded: true,
        categoryData: action.payload
      }
    case GET_CHILD_ENTITY:
      let config = action.payload,
          dataKey = config.entity + 'data'
        return {
          ...state,
          isItemdataLoaded: true,
          [dataKey]: config.data
        }
    
    case GET_CHILD_ENTITY_LOADING:
      return {
        ...state,
        isItemdataLoaded: false
      }
    case GET_CHILD_ENTITY_ERROR:
      return {
        ...state,
        isItemdataLoaded: true
      }
    default:
      return state
  }

}



