
import _ from 'lodash'

const baseUrl = 'http://localhost:10010/lripl/api/'


export const getParentUuid = (info, data, key) => {
    let uuid = ''
    if(data){
      data.forEach(category => {
        if(category.name === info){
            uuid =  category[key]              
        }
        
      });}
return uuid
  }
  export const formatOptions = (data) => {
    let options = []
    if(data && data.length > 0){
      data.forEach(record => {
        if(record.name){
          
      let optionObj = {
         value: record.name, label: record.name}
    
    options.push(optionObj)

        }
      })
    }
    return options
  
  }
  
