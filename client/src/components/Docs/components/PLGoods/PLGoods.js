import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PLGoods = (props) => (
  <React.Fragment>
    <Row className="mt-3 bg-blue-primary text-light text-center rounded py-2 mb-2">
      <Col>
        <h6 className="m-0">
          Description of <span className="font-weight-bold">Goods</span>
        </h6>
      </Col>
    </Row>
    <Row>
      <Container>
        <Row className="font-weight-bold text-center border-bottom">
          <Col className="py-1 border-right">M{"&"}N</Col>
          <Col xs="3" className="py-1 text-left border-right">
            Description
          </Col>
          <Col className="py-1 border-right">NCM</Col>
          <Col className="py-1 border-right">
            Qty <small className="text-muted">(Cartons)</small>
          </Col>
          <Col className="py-1 border-right">Per Carton</Col>
          <Col className="py-1 border-right">
            Net W <small className="text-muted">(kg)</small>
          </Col>
          <Col className="py-1">
            Gross W <small className="text-muted">(kg)</small>
          </Col>
        </Row>
        {props.data.items.map((item, idx) => (
          <Row
            className={
              "text-center border-bottom" + (idx % 2 === 0 ? " bg-light" : "")
            }
            key={idx}
          >
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.marksNumbers}
            </Col>
            <Col
              xs="3"
              className="py-1 text-left d-flex align-items-center border-right"
            >
              {item.description}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.ncm}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.ctnsQty}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.perCtn} Un.
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.weight.net}
            </Col>
            <Col className="py-2 d-flex align-items-center justify-content-center">
              {item.weight.gross}
            </Col>
          </Row>
        ))}
        {/*
        {props.data.items.map((item, idx) => (
          <Row
            className={
              "text-center border-bottom" + (idx % 2 === 0 ? " bg-light" : "")
            }
          >
            <Col
              xs="3"
              className="py-2 text-left border-right d-flex align-items-center"
            >
              {item.description}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.ncm}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.qty}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-center">
              {item.unit}
            </Col>
            <Col className="py-2 border-right d-flex align-items-center justify-content-between">
              <div>USD</div>
              <div>{item.unitPrice}</div>
            </Col>
            <Col
              xs="2"
              className="py-2 d-flex align-items-center justify-content-between"
            >
              <div>USD</div>
              <div>{item.totalPrice}</div>
            </Col>
          </Row>
        ))} */}
      </Container>
    </Row>
  </React.Fragment>
);

export default PLGoods;
