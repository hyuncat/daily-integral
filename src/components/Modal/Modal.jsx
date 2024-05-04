import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Modal.css';


const Modal = ({ buttonText, modalTitle, modalContent, backText, startText }) => {
    const history = useHistory();

    const handleNextClick = (route) => {
        // Close modal here

        history.push(route);
    };

    return (
      <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          {buttonText}
        </button>
  
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{modalTitle}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {modalContent}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{backText}</button>
                <Link to="/daily-integral" className="btn btn-primary">{startText}</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Modal;