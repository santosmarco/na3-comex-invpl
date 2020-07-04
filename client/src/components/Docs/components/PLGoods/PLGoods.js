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
        <Row className="font-weight-bold text-center border-bottom ">
          <Col className="py-1 border-right">
            <div className="d-flex h-100 align-items-center justify-content-center">
              Marks
            </div>
          </Col>
          <Col xs="3" className="py-1 text-left border-right">
            <div className="d-flex h-100 align-items-center">Description</div>
          </Col>
          <Col className="py-1 border-right">
            <div className="d-flex h-100 align-items-center justify-content-center">
              NCM
            </div>
          </Col>
          <Col className="py-1 border-right">
            <div className="d-flex h-100 align-items-center justify-content-center">
              <div>
                Qty <small className="text-muted">(Cartons)</small>
              </div>
            </div>
          </Col>
          <Col className="py-1 border-right">
            <div className="d-flex h-100 align-items-center justify-content-center">
              Per Carton
            </div>
          </Col>
          <Col xs="3">
            <Row>
              <Col className="border-bottom py-1">Weight</Col>
            </Row>
            <Row>
              <Col className="py-1 border-right text-center font-weight-normal">
                Net
              </Col>
              <Col className="py-1 text-center font-weight-normal">Gross</Col>
            </Row>
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
            <Col xs="3">
              <Row className="h-100">
                <Col className="py-2 border-right d-flex align-items-center justify-content-between">
                  <div>{item.weight.net}</div>
                  <div>KG</div>
                </Col>
                <Col className="py-2 d-flex align-items-center justify-content-between">
                  <div>{item.weight.gross}</div>
                  <div>KG</div>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Container>
    </Row>
  </React.Fragment>
);

export default PLGoods;
