import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DocSignArea = (props) => {
  return (
    <Row className="justify-content-end" style={{ marginTop: "200px" }}>
      <Col xs="5" className="border-top border-dark">
        <h6 className="text-center m-0 pt-2">
          NOVA A3 INDÚSTRIA E COMÉRCIO LTDA.
        </h6>
        <div className="text-center">
          {props.data.name} ({props.data.role}
          {props.data.dpt ? `, ${props.data.dpt} Dpt.` : ""})
        </div>
      </Col>
    </Row>
  );
};

export default DocSignArea;
