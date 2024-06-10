import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const SessionModel = ({
    show,
    action,
    actionType,
    title,
    message,
}) => {

    return (
        <>
            {show && (
                <Modal size="md" show={show} centered backdrop="static" animation={true} keyboard={false} className='session-model border-0'>
                    <Modal.Header className="session-modal-header border-0">
                        <Modal.Title className='session-title-style border-0'>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-container bg-white border-0'>
                        <div className='modal-container-text mt-3'>{message}</div>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-white border-0">
                        <Button variant="primary" className='modal-btn' onClick={() => action()} >{actionType}</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
