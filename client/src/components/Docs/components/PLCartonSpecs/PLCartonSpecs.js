import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PLCartonSpecs = (props) => {
  return (
    <React.Fragment>
      <h6 className="bg-blue-primary text-light text-center rounded py-2">
        Carton <span className="font-weight-bold">Specs</span>
      </h6>
      <Container fluid>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            <div>
              Dimensions{" "}
              <small className="font-weight-normal text-muted">(Outer)</small>
            </div>
          </Col>
          <Col className="py-1 d-flex align-items-center justify-content-end">
            {props.cartonData.defaultUnitWidth}m (W) x{" "}
            {props.cartonData.defaultUnitLength}m (L) x{" "}
            {props.cartonData.defaultUnitHeight}m (H)
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            <div>
              Volume{" "}
              <small className="font-weight-normal text-muted">(Outer)</small>
            </div>
          </Col>
          <Col className="py-1 d-flex align-items-center justify-content-end">
            {props.cartonData.defaultUnitVolume} m<sup>3</sup>
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col className="py-1 font-weight-bold d-flex align-items-center">
            <div>Net Weight</div>
          </Col>
          <Col className="py-1 d-flex align-items-center justify-content-end">
            {props.cartonData.defaultUnitWeight} KG
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default PLCartonSpecs;
