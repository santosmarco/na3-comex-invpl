import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaExclamationCircle } from "react-icons/fa";
import { incotermAbbrToName } from "../../../../utils";

const InvFooter = (props) => (
  <React.Fragment>
    <Row className="border-top py-3">
      <Col xs="3">
        <h5>Terms {"&"} Notes:</h5>
      </Col>
      <Col>
        <div className="mb-1">
          <span className="font-weight-bold">Terms of Delivery:</span>{" "}
          {incotermAbbrToName(props.data.incoterm)} ({props.data.incoterm})
        </div>
        <div>
          <div>
            <span className="font-weight-bold">Payment:</span>{" "}
            {props.data.paymentTerms}
          </div>
        </div>
        {props.data.notes.length > 0 ? (
          <div className="mt-1">
            <span className="font-weight-bold">Notes:</span>{" "}
            {props.data.notes.map((note, idx) => (
              <span key={idx}>
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
            <div className="border-bottom mb-1">Intermediary Bank</div>
            <div className="font-weight-bold">JPMorgan Chase Bank, NA</div>
            <div>Swift Code: CHASUS33</div>
            <div>Account Number: 544705690</div>
          </Col>
          <Col>
            <div className="border-bottom mb-1">Beneficiary Bank</div>
            <div className="font-weight-bold">Itau Unibanco</div>
            <div>Swift Code: ITAUBRSP</div>
            <div>IBAN: BR19 6070 1190 0048 5000 0588 081C 1</div>
          </Col>
          <Col>
            <div className="border-bottom mb-1">Final Beneficiary</div>
            <div className="font-weight-bold">Nova A3 Ind. e Com. Ltda.</div>
            <div>Branch Number: 0485</div>
            <div>Account Number: 58808-1</div>
            <div className="mt-3 border-bottom mb-1 d-flex align-items-center">
              <FaExclamationCircle className="mr-1 text-blue-primary" />
              <div className="">Mention our Reference</div>
            </div>
            <div className="font-weight-bold text-center">
              {props.data.docNumber}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </React.Fragment>
);

export default InvFooter;
