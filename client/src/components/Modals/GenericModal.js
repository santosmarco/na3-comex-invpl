import React from "react";
import Modal from "react-bootstrap/Modal";

const GenericModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      {props.header ? (
        typeof props.header === "string" ? (
          <Modal.Header {...props.headerProps}>
            <h4 className="m-0">{props.header}</h4>
          </Modal.Header>
        ) : (
          <Modal.Header {...props.headerProps}>{props.header}</Modal.Header>
        )
      ) : null}
      {props.body ? (
        <Modal.Body {...props.bodyProps}>{props.body}</Modal.Body>
      ) : null}
      {props.footer ? (
        <Modal.Footer {...props.footerProps}>{props.footer}</Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default GenericModal;
