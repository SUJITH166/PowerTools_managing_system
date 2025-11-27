// Modal.jsx
import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        {/* <button className="btn" onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};


export default Modal;
