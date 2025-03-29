// ImageFullscreenModal.jsx
import React from "react";

const ImageFullscreenModal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
        onClick={onClose}
        aria-label="Close"
      ></button>
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 bg-transparent">
          <div className="modal-body p-0 text-center">
            <img
              src={imageUrl}
              className="img-fluid  rounded d-block"
              alt="Foto"
              style={{ maxHeight: "90vh" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/800/600";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFullscreenModal;
