import React from "react";
import Modal from "react-bootstrap/Modal";

const FormModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header
        className={
          "border-0" +
          (props.headerBg ? ` bg-${props.headerBg}` : " bg-dark") +
          (props.headerTxtColor
            ? ` text-${props.headerTxtColor}`
            : " text-light")
        }
      >
        <h4 className="m-0">{props.title}</h4>
      </Modal.Header>
      <Modal.Body>
        {typeof props.message === "string" ? (
          <p>{props.message}</p>
        ) : (
          props.message
        )}
        {props.formValuesAsList}
      </Modal.Body>
      <Modal.Footer>
        {props.buttons.map((btn, idx) => (
          <React.Fragment key={idx}>{btn}</React.Fragment>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
