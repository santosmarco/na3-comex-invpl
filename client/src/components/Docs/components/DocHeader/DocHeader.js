import React from "react";
import logo from "../../../../assets/img/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DocHeader = (props) => {
  return (
    <Row className="align-items-center border-bottom pb-3">
      <Col className="pl-0">
        <img src={logo} alt="Nova A3 Logo" className="w-100" />
      </Col>
      <Col xs="5">
        <h1 className="m-0 text-center font-weight-bold text-blue-primary">
          {props.data.title}
        </h1>
      </Col>
      <Col className="pr-0">
        <div className="px-3 py-2 border rounded">
          <div className="mb-1 d-flex justify-content-between align-items-center border-bottom">
            <div>Number</div>
            <div className="text-monospace">{props.data.number}</div>
          </div>
          <div className="mb-1 d-flex justify-content-between align-items-center border-bottom">
            <div>Date</div>
            <div className="text-monospace">{props.data.date}</div>
          </div>
          <div className="mb-1 d-flex justify-content-between align-items-center border-bottom">
            <div>Order Number</div>
            <div className="text-monospace">{props.data.orderNumber}</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DocHeader;
