import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaChevronRight } from "react-icons/fa";
import { sayTotal } from "../../../../utils";

const DocSayTotal = (props) => {
  return (
    <Row className="border-bottom border-top py-1 mt-2 mb-3">
      <Col className="d-flex align-items-center">
        <FaChevronRight />
        <div className="font-weight-bold mx-1">
          SAY TOTAL: <small className="text-muted">({props.description})</small>
        </div>
        <div>{sayTotal(props.total, props.type || "currency")}</div>
      </Col>
    </Row>
  );
};

export default DocSayTotal;
