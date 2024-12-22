import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./customtextarea.style.scss";

function CustomTextArea({
  id = "textareaResize",
  className = "",
  name = "",
  ...rest
}) {
  const [value, setValue] = useState("");
  const textareaRef = document.querySelector(`#${id}`);
  useEffect(() => {
    if (textareaRef) {
      textareaRef.style.height = "0px";
      const scrollHeight = textareaRef.scrollHeight;
      textareaRef.style.height = scrollHeight + "px";
    }
  }, [textareaRef, value]);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <>
      <Form.Control
        onChange={handleChange}
        as="textarea"
        id={id}
        className={`textarea-resize ${className}`}
        rows={1}
        {...rest}
      />
    </>
  );
}

CustomTextArea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default CustomTextArea;
