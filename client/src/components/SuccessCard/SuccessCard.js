import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SuccessCard = (props) => (
  <div>
    <div className="bg-success rounded py-4 px-3 mb-5 text-center text-light">
      <h1 className="display-4 mb-4">
        <FaCheckCircle className="font-weight-bold" />
      </h1>
      <h6>
        <span className="font-weight-bold">Success!</span> An Invoice and a
        Packing List have been generated for the following process:{" "}
        <span className="text-monospace">{props.processNumber}</span>
      </h6>
    </div>
    <Form.Row>
      <Col xs="4" md="2" lg="1">
        <Button
          variant="outline-secondary"
          className="d-flex align-items-center h-100 justify-content-center"
          onClick={props.onRunAgain}
          block
        >
          <FaChevronLeft />
        </Button>
      </Col>
      <Col>
        <Button onClick={props.onPrint} block>
          Print Docs
        </Button>
      </Col>
    </Form.Row>
  </div>
);

SuccessCard.propTypes = {
  onPrint: PropTypes.func.isRequired,
  onRunAgain: PropTypes.func.isRequired,
};

export default SuccessCard;
