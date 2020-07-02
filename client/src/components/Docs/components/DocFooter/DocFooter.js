import React from "react";
import PropTypes from "prop-types";
import docFooter from "../../../../assets/svg/doc-footer.svg";

const DocFooter = (props) => {
  return (
    <div
      className="position-absolute w-100"
      style={{ bottom: "0px", left: "0px" }}
    >
      <img src={docFooter} width="100%" alt="Footer" />
    </div>
  );
};

DocFooter.propTypes = {
  headerData: PropTypes.object,
  printing: PropTypes.bool,
};

export default DocFooter;
