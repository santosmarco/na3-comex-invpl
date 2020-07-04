import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import * as utils from "../../../../../utils";

const NumberWarning = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header className="border-0 bg-warning text-light">
        <h4 className="m-0">Caution</h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          The next recommended Process Number for exportations is{" "}
          <span className="text-monospace font-weight-bold">
            {utils.formatDocNumber(props.nextExportationNumber)}
          </span>
          , but you have chosen{" "}
          <span className="text-monospace">
            {utils.formatDocNumber(props.currentNumber)}
          </span>
          .
        </p>
        <p>Prior to continuing, you now must make a decision:</p>
        <ul>
          <li>
            <h6 className="m-0 d-inline font-weight-bold">(Recommended)</h6>{" "}
            Revert back to the recommended Process Number (
            <span className="text-monospace">
              {utils.formatDocNumber(props.nextExportationNumber)}
            </span>
            ) and then continue; or
          </li>
          <li>
            Continue with{" "}
            <span className="text-monospace">
              {utils.formatDocNumber(props.currentNumber)}
            </span>{" "}
            <strong>without replacing</strong> the current Process registered
            under this number in the database (if any); or
          </li>
          <li>
            Continue with{" "}
            <span className="text-monospace">
              {utils.formatDocNumber(props.currentNumber)}
            </span>{" "}
            <strong>and do replace</strong> the current Process registered under
            this number in the database (if any).
          </li>
        </ul>
        <p>What would you like to do now?</p>
      </Modal.Body>
      <Modal.Footer className="d-block">
        <Accordion>
          <Row className="align-items-center">
            <Col xs="2">
              <Button variant="outline-secondary" onClick={props.onHide} block>
                Back
              </Button>
            </Col>
            <Col className="text-right">
              <Accordion.Toggle
                as={Button}
                variant="link"
                className="p-0"
                eventKey="1"
              >
                <h6 className="m-0">More options</h6>
              </Accordion.Toggle>
            </Col>
            <Col xs="6">
              <Button variant="primary" onClick={props.onContinue} block>
                Revert back to{" "}
                <span className="text-monospace">
                  {utils.formatDocNumber(props.nextExportationNumber)}
                </span>{" "}
                and continue
              </Button>
            </Col>
          </Row>
          <Accordion.Collapse eventKey="1">
            <React.Fragment>
              <Row className="justify-content-end mt-2">
                <Col xs="6">
                  <Button
                    variant="outline-secondary"
                    onClick={() => props.onContinue(false)}
                    block
                  >
                    Continue without replacing
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-end mt-1">
                <Col xs="6">
                  <Button
                    variant="outline-danger"
                    onClick={() => props.onContinue(false, true)}
                    block
                  >
                    Continue and replace
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
          </Accordion.Collapse>
        </Accordion>
      </Modal.Footer>
    </Modal>
  );
};

export default NumberWarning;
