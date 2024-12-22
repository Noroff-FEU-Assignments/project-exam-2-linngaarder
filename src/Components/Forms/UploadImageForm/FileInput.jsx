import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function FileInput({ resultHandler, className = "" }) {
  const [imagePreview, setImagePreview] = useState("");
  const handleImagePreview = (e) => {
    if (e.target.files[0]) {
      toDataUrl(e.target.files[0], setImagePreview);
      resultHandler(imagePreview);
    } else setImagePreview("");
  };
  return (
    <Form.Group className={`file-input ${className}`}>
      <Form.Label>Choose a picture to upload</Form.Label>
      <Form.Control
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImagePreview}
      />
      <div>{imagePreview && <img src={imagePreview} alt="Your pick" />}</div>
    </Form.Group>
  );
}

FileInput.propTypes = {
  resultHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FileInput;

function toDataUrl(file, handler) {
  const reader = new FileReader();

  reader.onloadend = () => {
    handler(reader.result);
  };
  reader.readAsDataURL(file);
}
