import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { BiBadgeCheck } from 'react-icons/bi';

const SuccessModal = (props) => {
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
                    <BiBadgeCheck size={50} className="text-success" /> <span>{props.msg}</span>
                </div>
            </Modal.Body>
            <Modal.Footer className="button-wrapper">
                <Button className="proceed-btn btn" onClick={props.action}>
                    {props.actionText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
