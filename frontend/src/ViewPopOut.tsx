import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import './style/ViewPopOut.css'; 

function ViewPopOut({post}:any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customDialogClassName = 'custom-modal-dialog';

  return (
    <>
      <span style={{paddingLeft: '.3rem'}}onClick={handleShow}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </span>

      <Modal className="custom-modal" dialogClassName={customDialogClassName}  show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title>{post.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <h6> content:</h6>
        {post.content}
          <h6> problem:</h6>
        {post.problem}
          <h6> solution:</h6>
        {post.solution}
        </Modal.Body>
      </Modal>
    </>

  )
}

export default ViewPopOut;