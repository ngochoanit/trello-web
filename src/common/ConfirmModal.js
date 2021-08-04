import React from 'react'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/contanst'
import { Button, Modal } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
ConfirmModal.propTypes = {
}

function ConfirmModal(props) {
    const { title, content, show, onAction } = props
    return (
        <Modal
            show={show}
            onHide={() => onAction(MODAL_ACTION_CLOSE)}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className='h5'>{HTMLReactParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ConfirmModal