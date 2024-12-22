import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import "./bootstrapform.style.scss";

function BootstrapForm({
  children,
  onSubmit,
  className = "",
  id = "",
  ...rest
}) {
  return (
    <Form
      onSubmit={onSubmit}
      className={`system-form full-width standard-component-width ${className}`}
      id={id}
      {...rest}
    >
      {children}
    </Form>
  );
}

BootstrapForm.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default BootstrapForm;
