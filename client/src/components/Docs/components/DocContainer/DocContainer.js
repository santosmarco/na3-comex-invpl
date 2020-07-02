import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import DocHeader from "../DocHeader/DocHeader";
import DocTo from "../DocTo/DocTo";
import DocSignArea from "../DocSignArea/DocSignArea";
import DocFooter from "../DocFooter/DocFooter";

const DocContainer = (props) => {
  const classNames = ["d-none", "position-relative"];
  if (props.printing) {
    classNames.push("d-print-block");
  }

  return (
    <Container className={classNames.join(" ")} style={{ minHeight: "100vh" }}>
      <DocHeader data={props.headerData} />
      <DocTo data={props.toData} />
      {props.children}
      <DocSignArea data={props.signeeData} />
      <DocFooter />
    </Container>
  );
};

DocContainer.propTypes = {
  headerData: PropTypes.object,
  printing: PropTypes.bool,
};

export default DocContainer;
