import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './Modal.css';

const MyModal = ({ buttonText, modalTitle, modalContent, backText, startText }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeAndRouteModal = (route) => {
    setIsOpen(false); // Close
    navigate(route); // Go to new route
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={openModal}>
        {buttonText}
      </Button>

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            {backText}
          </Button>
          <Button variant="primary" onClick={() => closeAndRouteModal('/daily-integral')}>
            {startText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;