import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PLFooter = (props) => (
  <Row className="border-top border-bottom py-3 align-items-baseline">
    <Col xs="3">
      <h5 className="m-0">Our Responsibility:</h5>
    </Col>
    <Col>
      <div className="mb-1">
        <span className="font-weight-bold">We hereby declare</span> the above
        mentioned information is correct and true by the best of our knowledge
        and the merchandising is of Brazilian origin.
      </div>
    </Col>
  </Row>
);

export default PLFooter;
