import React from "react";

const DocWatermark = (props) => {
  return (
    <div
      className="d-flex position-absolute align-items-center justify-content-center text-blue-primary"
      style={{
        left: "0px",
        top: "0px",
        height: "100%",
        width: "100%",
        opacity: "0.6",
      }}
    >
      <div
        style={{
          transform: "rotate(-45deg)",
          fontSize: props.fontSize || "100%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default DocWatermark;
