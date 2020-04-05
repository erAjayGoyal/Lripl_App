import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

const CustomModal = props => {
  // eslint-disable-next-line react/prop-types
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Manager</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Manager">Hiring Manager</Label>
            <Input type="name" placeholder="Enter Manager Name" />
          </FormGroup>
          <FormGroup>
            <Label for="mailid">Email ID</Label>
            <Input type="email" placeholder="Enter Manager's Mail ID" />
          </FormGroup>
          <FormGroup>
            <Label for="HR">HR Partner</Label>
            <Input type="name" placeholder="Enter Manager's HR Partner" />
          </FormGroup>
          <FormGroup>
            <Label for="Location">Location</Label>
            <Input type="select">
              <option> </option>
              <option>Continous</option>
              <option>Innovations</option>
              <option>WHQ</option>
              <option>Realization</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="OrgUnit">Org Unit</Label>
            <Input type="select">
              <option> Cerner Works 0</option>
              <option>Cerner Works</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={toggle}>
            Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;