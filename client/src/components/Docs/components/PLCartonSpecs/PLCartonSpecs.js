import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PLCartonSpecs = (props) => (
  <React.Fragment>
    <h6 className="bg-blue-primary text-light text-center rounded py-2">
      Carton <span className="font-weight-bold">Specs</span>
    </h6>
    <Container fluid>
      <Row className="border-bottom">
        <Col className="py-1 font-weight-bold d-flex align-items-center">
          Dimensions
        </Col>
        <Col className="py-1 d-flex align-items-center justify-content-end">
          0.32m (W) x 0.48m (L) x 0.24m (H)
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default PLCartonSpecs;
