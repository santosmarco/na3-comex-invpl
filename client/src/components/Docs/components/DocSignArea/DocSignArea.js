import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DocSignArea = (props) => {
  return (
    <Row
      className="justify-content-end"
      style={{ marginTop: props.data.numOfItems >= 3 ? "150px" : "200px" }}
    >
      <Col xs="5" className="border-top border-dark">
        <h6 className="text-center m-0 pt-2">
          NOVA A3 INDÚSTRIA E COMÉRCIO LTDA.
        </h6>
        <div className="text-center">
          {props.data.signee.name} ({props.data.signee.role}
          {props.data.signee.dpt ? `, ${props.data.signee.dpt} Dpt.` : ""})
        </div>
      </Col>
    </Row>
  );
};

export default DocSignArea;
