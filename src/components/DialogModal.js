import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { ModalStyle } from '../styles/ModalStyle'

class DialogModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null
    }
    return (
      <ModalStyle>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title id="mdl_dialog_prop">{this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
        </Modal.Dialog>
      </ModalStyle>
    )
  }
}

DialogModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
}

export default DialogModal
