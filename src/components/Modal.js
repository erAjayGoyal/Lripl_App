import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalStyle } from '../styles/ModalStyle'
import {MdDone} from "react-icons/md"
import {IconContext} from "react-icons"

//import { Result } from '../constants/Messages'
class SubmitDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose() {
    this.props.closeHandler(this.state.data)
  }

  render() {
    var classOfPopup
    var iconUsed
    if (this.props.code && this.props.code === 200) {
      classOfPopup = 'sideBar-success-popup'
      iconUsed = <MdDone/>
    } else if (typeof this.props.code == 'string') {
      classOfPopup = 'sideBar-Info-abt'
      iconUsed = <MdDone/>
    } else {
      classOfPopup = 'sideBar-failure-popup'
      iconUsed = 'highlight_off_outline'
    }
    //Result.statusCode = ''
    return (
      <ModalStyle>
        <Modal.Dialog id="modal_about" dialogClassName="aboutDialog">
          <div className={classOfPopup}>
          <IconContext.Provider value={{ color: "white", style: { height: '40px', width : '30px', marginTop : '5.5px' } }}>
  
            {iconUsed}
            </IconContext.Provider>
            {/* <i
              className="material-icons icon"
              aria-hidden="true"
              id="Icon"
              onClick={this.handleSideNav}
              outline
            >
              {iconUsed}
            </i> */}
          </div>
          <div className="margin-set">
            <Modal.Body> {this.props.message}</Modal.Body>
            <Modal.Footer>
              <Button
                id="btnClose"
                className="button custom-button-class"
                open={this.props.show}
                onClick={this.handleClose}
                style={{ textTransform: 'capitalize' }}
              >
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </ModalStyle>
    )
  }
}

export default SubmitDialog
