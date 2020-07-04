import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import GenericModal from "../GenericModal";

const BrowserModal = (props) => {
  const [show, setShow] = useState(props.show);

  const handleHide = () => setShow(false);

  return (
    <GenericModal
      show={show}
      onHide={handleHide}
      header="Browser not fully supported"
      headerProps={{ className: "bg-danger text-light" }}
      body={
        <p>
          Please use <strong>Google Chrome</strong>.
        </p>
      }
      footer={
        <Button variant="danger" onClick={handleHide}>
          Continue anyway
        </Button>
      }
    />
  );
};

export default BrowserModal;
