import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const SuccessCard = (props) => (
  <div>
    <div className="bg-success rounded py-4 mb-5 text-center text-light">
      <h1 className="display-4 mb-3">
        <FaCheckCircle className="font-weight-bold mr-1" />
      </h1>
      <h6>
        <span className="font-weight-bold">Success!</span> An Invoice and a
        Packing List have been generated for the following process:{" "}
        <span className="text-monospace">{props.processNumber}</span>
      </h6>
    </div>
    <div className="d-flex justify-content-between">
      <div>
        <Button
          variant="outline-secondary"
          className="mr-2"
          onClick={props.onRunAgain}
        >
          Run again
        </Button>
      </div>
      <div>
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={props.onPrintInvoice}
        >
          Print Invoice
        </Button>
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={props.onPrintPackingList}
        >
          Print PL
        </Button>
        <Button onClick={props.onPrintBoth}>Print both</Button>
      </div>
    </div>
  </div>
);

SuccessCard.propTypes = {
  onPrintInvoice: PropTypes.func.isRequired,
  onPrintPackingList: PropTypes.func.isRequired,
  onPrintBoth: PropTypes.func.isRequired,
  onRunAgain: PropTypes.func.isRequired,
};

export default SuccessCard;
