import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PLTotals = (props) => (
  <React.Fragment>
    <h6 className="bg-blue-primary text-light text-center rounded py-2">
      <span className="font-weight-bold">Totals</span>
    </h6>
    <Container fluid>
      <Row className="border-bottom">
        <Col className="py-1 font-weight-bold d-flex align-items-center">
          Cartons
        </Col>
        <Col className="py-1 d-flex align-items-center justify-content-end">
          {props.data.ctns}
        </Col>
      </Row>
      <Row className="border-bottom">
        <Col className="py-1 font-weight-bold d-flex align-items-center">
          Volume
        </Col>
        <Col className="py-1 d-flex align-items-center justify-content-end">
          {props.data.volume} m<sup>3</sup>
        </Col>
      </Row>
      <Row className="border-bottom">
        <Col className="py-1 font-weight-bold d-flex align-items-center">
          Net Weight
        </Col>
        <Col className="py-1 d-flex align-items-center justify-content-end">
          {props.data.weight.net} KG
        </Col>
      </Row>
      <Row className="border-bottom">
        <Col className="py-1 font-weight-bold d-flex align-items-center">
          Gross Weight
        </Col>
        <Col className="py-1 d-flex align-items-center justify-content-end">
          {props.data.weight.gross} KG
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default PLTotals;
