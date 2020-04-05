import { combineReducers } from 'redux'
import treeview from './treeView'
import dataItem from './dataItem'

import login from './login'
const rootReducer = combineReducers({
treeview,
dataItem,
login})

export default rootReducer
