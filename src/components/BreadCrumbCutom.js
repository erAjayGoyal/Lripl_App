/* eslint-disable no-unused-expressions */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import '../styles/breadCrumbCustom.scss'
var browserHistory = require('react-router').browserHistory
const styles = {
  root: {
    top: 95,
    left: 190,
    position: 'fixed',
    fontSize: 16,
    zIndex: 10
  },
};

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

function handleClick(props,path){
//window.location.href = path
props.history.push(path)
// props.history.push({
//   pathname: path,
//   state: { categoryData:  {}}
// })
//browserHistory.push(path)
}

 function BreadCrumb(props) {
   
  const { classes, children, className, ...other } = props;
    let activatedRoutes = props.activatedRoutes
    //let routeLen = activatedRoutes && activatedRoutes.length(); 
    //let childActive = activatedRoutes[0].children ? true : false
    const items = []
    if(activatedRoutes){
      for (const [index, value] of activatedRoutes.entries()) {
        console.log('this is name and profile', index, "drgdgd", value)
        items.push(<Link color="inherit"  onClick={(e) => {handleClick(props,value.path)}} >
        {value.Name}
      </Link>)
      }}
    
      
    
      return (
        
        <Breadcrumbs
        className={clsx(classes.root, className)} {...other} 
        aria-label="breadcrumb" classname = "customBreadCrumb">
          {items}
        {/* <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Link
          color="textPrimary"
          href="/components/breadcrumbs/"
          onClick={handleClick}
          aria-current="page"
        >
          Breadcrumb
        </Link> */}
      </Breadcrumbs>
      )
    }    
export default withStyles(styles)(BreadCrumb)

  // return (
  //   <Breadcrumbs aria-label="breadcrumb">
  //   {
  //     activatedRoutes && activatedRoutes.forEach(element => {
       
  //       <Link color="inherit" href="/" onClick={handleClick}>
  //     jkghjgjghj,gj,gjg,gb,
  //     </Link>
  //     })
  //   }
    
  // {/* <Link color="inherit" href="/" onClick={handleClick}>
  //       Material-UI
  //     </Link>
  //     <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
  //       Core
  //     </Link>
  //     <Typography color="textPrimary">Breadcrumb</Typography> 
  //   </Breadcrumbs>
//   );
// }