import {
  UPDATE_ACTIVE_NODE,
  GET_STATE_DATA,
  GET_BRAND_DATA,
  GET_STATE_DATA_ERROR,
  GET_BRAND_DATA_ERROR
} from '../constants/ActionTypes'
import _ from 'lodash'

function getAppendedRoutes(newNode, activatedRoutes) {
  if(newNode.type === 'parent'){
    // if(activatedRoutes === undefined){
      activatedRoutes = [newNode]
      localStorage.setItem("persistedRoutes", JSON.stringify(activatedRoutes))
    // }

  }else{
    if(activatedRoutes === undefined){
      var newArray = JSON.parse(localStorage.getItem('persistedRoutes'))
  //    routeFromLocalstr.push(newNode)
  //var newArray = activatedRoutes.slice();
      var isPresent = false
      let elementAt = 0
      newArray.forEach((element, index) => {
        if(JSON.stringify(element) === JSON.stringify(newNode) ){
          isPresent = true
          elementAt = index
        }
        
      });
      
      if(isPresent){
        newArray.splice(elementAt+1, newArray.length - elementAt)
      }
      activatedRoutes = newArray
    }
    else{
      var newArray = activatedRoutes.slice();
      var isPresent = false
      let elementAt = 0
      newArray.forEach((element, index) => {
        if(JSON.stringify(element) === JSON.stringify(newNode) ){
          isPresent = true
          elementAt = index
        }
        
      });
      if(isPresent){
        newArray.pop();
      }
      else{
        
      newArray.push(newNode)
      }

    //  }
      activatedRoutes = newArray
      localStorage.setItem("persistedRoutes", JSON.stringify(activatedRoutes))

    }

  }


 return activatedRoutes
}



export default function treeview(state = [], action) {
  switch (action.type) {
    case UPDATE_ACTIVE_NODE:
      console.log('this is act', state.activatedRoutes)
      var updatedActivtedRoutes = getAppendedRoutes(action.payload, state.activatedRoutes)
      return {
        ...state,
        activatedRoutes: updatedActivtedRoutes
      }
    case GET_STATE_DATA:
      return {
        ...state,
        stateData: action.payload,
        isStateDataLoaded: true
      }
    case GET_STATE_DATA_ERROR:
      return {
        ...state,
        isStateDataLoaded: true
      }
    case GET_BRAND_DATA_ERROR:
      return {
        ...state,
        isBrandDataLoaded: true
      }
    case GET_BRAND_DATA:
      return {
        ...state,
        brandData: action.payload,
        isBrandDataLoaded: true
      }
    default:
      return state
  }

}
