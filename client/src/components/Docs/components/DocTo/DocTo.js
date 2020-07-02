import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DocTo = (props) => {
  return (
    <Row className="border-bottom py-3">
      <Col xs="3">
        <h5>To:</h5>
      </Col>
      <Col>
        <h5>{props.data.name}</h5>
        <div>
          {props.data.street[0]} — {props.data.street[1]}
        </div>
        <div>
          {props.data.city} — {props.data.state}
        </div>
        <div>ZIP: {props.data.zip}</div>
        <div>{props.data.country}</div>
        <div>
          {props.data.vat.abbr}: {props.data.vat.number}
        </div>
      </Col>
    </Row>
  );
};

export default DocTo;
