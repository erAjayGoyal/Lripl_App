import styled from 'styled-components'
export const ModalStyle = styled.div`
  position: fixed;
  z-index: 1000;
  .modal-footer {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .sideBar-failure-popup {
    width: 15%;
    height: 100%;
    background-color: rgb(240, 48, 64);
    position: absolute;
  }
  .sideBar-success-popup {
    width: 15%;
    height: 100%;
    background-color: rgb(33, 190, 137);
    position: absolute;

  .stleIcon {
    width: 62px;
    margin-top: 13px;
    height: 32px;
    color: white;
    
  vertical-align: middle;
  }
  }
  .sideBar-Info-abt {
    width: 15%;
    height: 100%;
    background-color: #db3c5a;
    position: absolute;
    display: block;
    text-align : center;
  }
  .margin-set {
    padding-left: 15%;
  }

  #Icon {
    color: white;
    font-size: 37px;
    text-align: center;
    padding: 13px;
    /* Portrait iphone X*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      padding: 9px !important;
      padding-top: 12px !important;
    }
    /* Portrait Iphone 6,7,8*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      padding: 10px !important;
      padding-top: 11px !important;
    }
    /* Portrait  iphone 5*/
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      padding: 4px;
      padding-top: 9px;
    }
  }

  #IconAbt {
    color: white;
    font-size: 37px;
    text-align: center;
    padding: 13px;

    /* Portrait iphone X*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
      padding: 9px !important;
      padding-top: 12px !important;
    }

    /* Landscape  iphone X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      padding: 15px !important;
      padding-top: 15px !important;
    }

    /* Portrait Iphone 6,7,8*/
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      padding: 10px !important;
      padding-top: 11px !important;
    }

    /* Landscape Iphone 6,7,8 */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
      padding: 14px !important;
      padding-top: 13px !important;
    }

    /* Portrait  iphone 5*/
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      padding: 4px;
      padding-top: 9px;
    }
  }
  .modal {
    background-color: rgba(0, 0, 0, 0.3);
    color: #333;
    display: block !important;
  }
  .modal-dialog {
    top: 35px;
    overflow: auto !important;
    height: 75%;

    /* Landscape  iPhone 6+, 7+ and 8+*/
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      margin-top: 36px;
      margin-left: 125px;
    }

    /* Landscape  iPhone 6, 6S, 7 and 8 */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
      margin-top: 36px;
      margin-left: 114px;
    }

    /* Landscape  ipfone 5*/
    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
      margin-top: 36px;
      margin-left: 69px;
    }
  }
  .aboutDialog {
    @media (min-width: 767px) {
      width: 440px;
    }
    /* Landscape Phone 6, 6S, 7 and 8 */
    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
      width: 440px;
    }

    /* Landscape 6, 6S, 7 and 8 + */
    @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      width: 440px;
    }
  }
  .modal-content {
    border-radius: 0px;
  }
  .btn-primary {
    height: 30px;
    font-size: 12px;
    padding: 6px;
  }
  .modal-body {
    max-height: 650px;
    overflow-y: auto;
    padding-top: 5px;
    padding-top: 16px;
    min-height: 66px;
    td {
      padding: 1px 0px;
    }
  }
  .custom-button-class {
    width: 100px;
    height: 30px;
    font-size: 12px;
    padding: 6px;
    border-radius: 0px;
    background-color: ##ededed;
    border: #d4d4d4 solid 1px;
    border-bottom: #8d8d8d solid 1px;
  }
`
