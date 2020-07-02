import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const FullPageLoading = () => (
  <div
    className="d-flex align-items-center justify-content-center flex-column bg-blue-primary text-light"
    style={{ minHeight: "100vh" }}
  >
    <BeatLoader color="#f8f9fa" size={12} />
    <div className="mt-2">Loading... Please wait</div>
  </div>
);

export default FullPageLoading;
