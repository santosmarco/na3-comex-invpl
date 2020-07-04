import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import cssClasses from "./MessagesFlasher.module.css";

const MessagesFlasher = (props) => {
  const removeFlashedMessage = () => {
    props.messagesSetter(props.messages.slice(1));
  };

  const typeToVariantName = (type) => {
    switch (type) {
      case "warning":
        return "warning";
      case "success":
        return "success";
      case "error":
        return "danger";
      default:
        return "primary";
    }
  };

  useEffect(() => {
    setTimeout(removeFlashedMessage, 8000);
  });

  return (
    <Alert
      className={cssClasses.MessagesFlasher + " fixed-top m-3 shadow-lg"}
      variant={typeToVariantName(props.messages[0].type)}
    >
      {props.messages[0].title ? (
        <Alert.Heading>{props.messages[0].title}</Alert.Heading>
      ) : null}
      {props.messages[0].body}
    </Alert>
  );
};

export default MessagesFlasher;
