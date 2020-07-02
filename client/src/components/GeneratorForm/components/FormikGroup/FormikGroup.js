import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { Field } from "formik";
import { camelCaseToTitle } from "../../../../utils";

import Select from "react-select";

const FormikGroup = (props) => {
  const generateFieldClassName = () => {
    let className = ["form-control"];
    if (
      (props.customInvalidCssChecker && props.customInvalidCssChecker()) ||
      (props.formikProps.touched[props.name] &&
        props.formikProps.errors[props.name])
    ) {
      className.push("is-invalid");
    }
    return className.join(" ");
  };

  let label;
  if (!props.noLabel) {
    if (!props.labelConfig || props.labelConfig.show) {
      if (!props.labelConfig) {
        label = (
          <React.Fragment>
            {camelCaseToTitle(props.name)}{" "}
            {props.required ? <span className="text-danger">*</span> : null}
          </React.Fragment>
        );
      } else {
        label = (
          <React.Fragment>
            {props.labelConfig.show}
            {props.required ? (
              <React.Fragment>
                {" "}
                <span className="text-danger">*</span>
              </React.Fragment>
            ) : null}
            <span className="text-light">{props.labelConfig.hide}</span>
          </React.Fragment>
        );
      }
      label = <Form.Label htmlFor={props.name}>{label}</Form.Label>;
    } else {
      label = (
        <Form.Label
          htmlFor={props.name}
          className="d-none d-md-block text-light"
        >
          {props.labelConfig.hide}
        </Form.Label>
      );
    }
  }

  let field = (
    <Field
      name={props.name}
      type={props.type}
      as={props.as}
      rows={props.rows}
      className={generateFieldClassName()}
      placeholder={props.placeholder}
    >
      {props.selectOptions
        ? ({ field, form }) => (
            <Select
              name={field.name}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "white" : "black",
                }),
                control: (provided) => {
                  if (
                    props.formikProps.touched[props.name] &&
                    props.formikProps.errors[props.name]
                  ) {
                    return {
                      ...provided,
                      borderColor: "#dc3545",
                    };
                  } else {
                    return provided;
                  }
                },
              }}
              value={
                props.selectOptions
                  ? props.selectOptions.find(
                      (option) => option.value === field.value
                    )
                  : ""
              }
              onChange={(option) => {
                if (!option) {
                  form.setFieldValue(field.name, "");
                } else {
                  form.setFieldValue(field.name, option.value);
                }
              }}
              onBlur={field.onBlur}
              options={props.selectOptions}
              isClearable={props.isClearable}
              defaultValue={props.isClearable ? null : props.selectOptions[0]}
              isSearchable
            />
          )
        : null}
    </Field>
  );
  let invalidFeedback;
  if (!props.noInvalidFeedback) {
    let invalidFeedbackBody = (
      <div className="invalid-feedback">
        {props.formikProps.errors[props.name]}
      </div>
    );
    if (props.selectOptions) {
      invalidFeedbackBody = (
        <small className="text-danger" style={{ marginTop: "0.25rem" }}>
          {props.formikProps.errors[props.name]}
        </small>
      );
    }

    invalidFeedback =
      props.formikProps.touched[props.name] &&
      props.formikProps.errors[props.name]
        ? invalidFeedbackBody
        : null;
  }
  let fieldHelp = props.fieldHelp ? (
    <Form.Text>{props.fieldHelp}</Form.Text>
  ) : null;

  let body = (
    <React.Fragment>
      {field}
      {invalidFeedback}
      {fieldHelp}
    </React.Fragment>
  );
  if (props.inputGroupConfig) {
    body = (
      <InputGroup>
        {props.inputGroupConfig.prepends
          ? props.inputGroupConfig.prepends.map((prepend, idx) => (
              <InputGroup.Prepend key={idx}>
                <InputGroup.Text>{prepend}</InputGroup.Text>
              </InputGroup.Prepend>
            ))
          : null}
        {field}
        {props.inputGroupConfig.appends
          ? props.inputGroupConfig.appends.map((append, idx) => (
              <InputGroup.Append key={idx}>
                <InputGroup.Text>{append}</InputGroup.Text>
              </InputGroup.Append>
            ))
          : null}
        {invalidFeedback}
        {fieldHelp}
      </InputGroup>
    );
  }

  return (
    <Form.Group
      as={Col}
      xs={props.xs}
      md={props.md || true}
      lg={props.lg || true}
      className={props.className}
    >
      {label}
      {body}
    </Form.Group>
  );
};

export default FormikGroup;
