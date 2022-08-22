import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { VscError } from 'react-icons/vsc';

const Error = (props) => {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
            className="status-modal"
            centered>
            <Modal.Body className="text-center">
                <div className="no-selection">
                    <VscError size={50} className="text-danger" /> <span>{props.msg}</span>
                </div>
            </Modal.Body>
            <Modal.Footer className="button-wrapper text-center">
                <Button className="proceed-btn btn modal-btn" onClick={props.action}>
                    {props.actionText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Error;
