import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InvFooter = (props) => (
  <React.Fragment>
    <Row className="border-top py-3">
      <Col xs="3">
        <h5>Terms {"&"} Notes:</h5>
      </Col>
      <Col>
        <div className="mb-1">
          <span className="font-weight-bold">Payment:</span>{" "}
          {props.data.paymentTerms}
        </div>
        {props.data.notes.length > 0 ? (
          <div>
            <span className="font-weight-bold">Notes:</span>{" "}
            {props.data.notes.map((note, idx) => (
              <span>
                {note}
                {idx !== props.data.notes.length - 1 ? " • " : null}
              </span>
            ))}
          </div>
        ) : null}
      </Col>
    </Row>
    <Row className="border-bottom pb-3">
      <Col xs="3">
        <h5>Payment Instructions:</h5>
      </Col>
      <Col className="pr-0">
        <Row>
          <Col>
            <strong>
              1. Please, credit our account through JPMorgan Chase Bank, NA
            </strong>
            <br />
            Swift Code: CHASUS33
            <br />
            Account Number: 544705690
          </Col>
          <Col>
            <strong>2. In favor of: ITAU UNIBANCO</strong>
            <br />
            Swift Code: ITAUBRSP
          </Col>
          <Col>
            <strong>
              3. For further credit to: NOVA A3 INDÚSTRIA E COMÉRCIO LTDA
            </strong>
            <br />
            Branch Number: 0485
            <br />
            Account Number: 58808-1
            <br />
            <strong>
              Mention our reference:
              <br />
              <div className="rounded border bg-light mt-1 px-2 py-1 text-center">
                {props.data.docNumber}
              </div>
            </strong>
          </Col>
        </Row>
      </Col>
    </Row>
  </React.Fragment>
);

export default InvFooter;
