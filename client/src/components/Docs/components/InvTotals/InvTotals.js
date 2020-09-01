import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const InvTotals = (props) => (
  <Form.Row
    className="mt-2"
    style={{ marginLeft: "-15px", marginRight: "-15px" }}
  >
    <Col xs="4" className="pl-0">
      <h6 className="bg-blue-primary text-light text-center rounded py-2">
        Total <span className="font-weight-bold">Weight</span>
      </h6>
      <Container fluid>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            Net
          </Col>
          <Col className="py-1 d-flex align-items-center justify-content-end">
            {props.data.weight.net} KG
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            Gross
          </Col>
          <Col className="py-1 d-flex align-items-center justify-content-end">
            {props.data.weight.gross} KG
          </Col>
        </Row>
      </Container>
    </Col>
    <Col className="pr-0">
      <h6 className="bg-blue-primary text-light text-center rounded py-2">
        Total <span className="font-weight-bold">Price</span>
      </h6>
      <Container fluid>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            <div>Subtotal</div>
          </Col>
          <Col
            xs="4"
            className="py-1 d-flex align-items-center justify-content-between"
          >
            <div>USD</div>
            <div>{props.data.price.items}</div>
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            + Freight
          </Col>
          <Col
            xs="4"
            className="py-1 d-flex align-items-center justify-content-between"
          >
            <div>USD</div>
            <div>{props.data.price.freight}</div>
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            + Insurance
          </Col>
          <Col
            xs="4"
            className="py-1 d-flex align-items-center justify-content-between"
          >
            <div>USD</div>
            <div>{props.data.price.insurance}</div>
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            = Final Amount
          </Col>
          <Col
            xs="4"
            className="py-1 d-flex align-items-center justify-content-between"
          >
            <div>USD</div>
            <div>{props.data.price.invoiceTotal}</div>
          </Col>
        </Row>
      </Container>
    </Col>
  </Form.Row>
);

export default InvTotals;
