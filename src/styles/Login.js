import styled from 'styled-components'
export const LoginStyle = styled.div`

.container {
    overflow: auto;
    width: 100%;
    @media only screen and (max-device-width: 321px) {
      //iPhone5
      width: 100%;
      .tableLogin{
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    @media only screen and (min-device-width: 350px) and (max-device-width: 667px) {
      padding-right: 15px;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .paddbottom40{
    padding-bottom: 20px !important;
  }
  .paddbottom20{
    padding-bottom: 20px !important;
    paddin-left:4px !important;
  }
  .login_headers{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}
.hr {
  border: 0;
  width: 80px;
  margin-top:5px;
  margin-bottom:15px;
  border-top: 1px solid rgb(0, 0, 0);
}
  .button-class {
    background-color: rgb(219, 60, 90) !important;
    color: white !important;
    width: 30% !important;
    height: 32px !important;
    border-radius: 20px;
    font-size: 13px !important;
    padding: 3px !important;
  }
  .button-class:hover {
    background-color: rgb(219, 60, 90, 0.8) !important;
    border: None !important;
  }
  .button-class:focus {
    outline: none !important;
    outline-offset: none !important;
}

  fieldset {
    border: 1px solid #ddd !important;
    margin: auto;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    border-radius: 4px;
    background-color: #f5f5f5;

  }
  .table > tbody > tr > td {
    padding: 0px;
    vertical-align: middle;
    border-top: 0px;
    font-size: 14px;
    line-height: 24px;
  }
  .table.login > tbody > tr > td {
    padding-top: 12px;
    padding-bottom:17px;
    padding-left: 3px
  }
  .table > thead > tr > th {
    padding: 3px;
    font-size: 14px;
    border-bottom: 0px;
  }
  .table > tbody > tr > th {
    border-top: 0px;
  }
  .button,
  .MS {
    width: 100%;
  }
  table {
    margin-top: 30px;
    margin-bottom: -6px !important;
  }
  .tableLogin {
    @media only screen and (min-device-width: 1280px) {
      //desktop
      padding-top: 14%;
      margin-top: 105px;
      width: 35%;
      margin: auto;
    }
    @media only screen and (min-device-width: 321px) and (max-device-width: 600px) {
      //iPhone6
      width: 100%;
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 15px;
      padding-right: 15px;
      margin-top: 100px;
    }
    
    @media only screen and (min-device-width: 567px) and (max-device-width: 920px) {
      //ipad
      width: 400px;
      margin: auto !important;
      padding-left: 15px;
      padding-right: 15px;
      margin-top: 100px;
    }
    @media only screen and (min-device-width: 921px) and (max-device-width: 1280px) {
      //ipad-pro
      width: 400px;
      margin-top: 100px !important;
      margin: auto !important;
      padding-left: 15px;
      padding-right: 15px;
    }
    @media only screen and (max-device-width: 1280px) and (min-device-width: 921px){
      padding-top: 20% ! important;
    }
   
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 920px) {
    fieldset{
      margin-top: 20%;
    }
  }
  @media only screen and (min-device-width: 921px) and (max-device-width: 1280px) {
    fieldset{
      margin-top: 12%;
    }
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: landscape) { .
      fieldset{
        margin-top: 10% !important;
      }
  
    }
  
  }
  .alignText {
    text-align: center;
    margin-right: 10px;
  }
  .tableBordered {
    height: 15px;
  }
  .checkboxclass {
    margin-right: 10px;
  }
  input[type="checkbox"]:checked + label::after {
    color: rgb(10, 174, 255) !important;
 }
  .form-control {
    width: 100%;   
  }
.btn-MS{
     display: inline-block;
    background: #0078d7;
    color: #fff;
    border-color: #0078d7;
    width: 80%;
    border: 1px solid transparent;
    font-size: 14px;
    font-family: Roboto;
    padding: 6px;
    margin-top: 10px;
}
.btn1{
margin-left: 10px; !improtant
}

.btncenter{
  margin: auto;
  text-align: center;
  margin-top:10px;
}

.incorect_details{
  margin-top: 15px;
  text-align: center;
  color: RED;
  FONT-SIZE: 14PX;
  margin-left: 30px;
}

`
