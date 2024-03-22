import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const DeleteConfirmModel = ({
    show,
    close,
    action,
    type,
    title,
    message
}) => {

    return (
        <>
            {show && (
                <Modal show={show} centered backdrop="static" animation={true} keyboard={false} onHide={()=>close()} className='delete-model border-0'>
                    <Modal.Header className="modal-header border-0">
                        <Modal.Title className='title-style border-0'>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-white border-0'>
                        <p className='modal-container'>{message}</p>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-white border-0">
                        <Button variant="outline-secondary" className='modal-btn' onClick={() => close()}>No</Button>
                        <Button variant="danger" className='modal-btn text-white' onClick={() => action()} >{type}</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
