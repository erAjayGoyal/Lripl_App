import styled from 'styled-components'

export const Styles = styled.div`
  #maindiv {
    position : fixed;
    width: auto;
    height: 86vh;
    background-color: rgb(38, 38, 38);
    top: 80px !important;
    -webkit-transition-property: width; /* Safari */
  -webkit-transition-duration: 1s; /* Safari */
  transition-property: width;
  transition-duration: 1s;
    @media (max-width: 767px) {
      position: fixed;
    top: 0;
    margin-top: -1px;
    padding-top: 4px;
    border-left: 1px solid black;
    }
  }

  .a {
   
  }

  .aLinkstyle{
    display : inherit;
    color :white;
    font-size:13px;
    margin-left: 15px;
  }
  .aLinkStyle:hover{
    color:black;
    text-decoration:none;
  }

  .icon {
    padding-left: 14px;
    position: absolute;
    font-size: 20px;
    cursor: pointer;
    color: #e8e8e8;
    width: 50px;
    height: 37px;
  }

  #mainicon {
    padding-top: 10px;
    font-size: 24px !important;
    @media (max-width: 767px) {
      height: 32px;
      padding-top: 5px;
      padding-left: 4px !important;
    }
  }

  .side-nav-block {
    margin-top:25%;
  }
  .list-group-item.active {
    background-color : 'red';
  }

  .sidebar_item {
    font-size: large;
    display: block;
    color: white;
    margin-bottom: 17px;
    font-weight: 100;
  }
  .sidebar_item:hover {
    
    color:#db3c5a !important;
    text-decoration: none;
  }


  .a:hover{
    color: black;
    text-decoration: none;
  }

  .spanStyleIcon{
    margin-top: 2px;
    margin=left: 9px;
    position: absolute;
    margin-left: 16px;
    font-size: 21px;
  }
  .spanStyle{
    color: white;
    padding-right: 20px;
    padding-left: 37px;
    font-size: 16px;
}
  }
  .custom {
    margin-top : 0%  ;
  }
  
  .Arrow {
    margin-top:32px;
  }
  
  

`
