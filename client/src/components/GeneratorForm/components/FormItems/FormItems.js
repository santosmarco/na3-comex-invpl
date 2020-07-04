import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FieldArray } from "formik";
import { FaTrash } from "react-icons/fa";
import FormikGroup from "../FormikGroup/FormikGroup";
import { camelCaseToTitle } from "../../../../utils";

const FormItems = (props) => {
  let label = (
    <Form.Label htmlFor={props.name}>
      {camelCaseToTitle(props.name)}{" "}
      {props.required ? <span className="text-danger">*</span> : null}
    </Form.Label>
  );

  let errors = props.formikProps.errors[props.name];
  let errorMsg;
  if (typeof errors === "string") {
    // then "You must select at least one item"
    errorMsg = props.formikProps.errors[props.name];
  } else if (typeof errors === "object") {
    // then "Item quantity must be non-empty and greater than zero"
    errorMsg = "Item quantities must be non-empty and greater than zero";
  }

  return (
    <Form.Group as={Col}>
      {label}
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <div>
            {props.formikProps.values[props.name] &&
            props.formikProps.values[props.name].length > 0
              ? props.formikProps.values[props.name].map((item, idx) => (
                  <Form.Row key={idx} className="align-items-end">
                    <FormikGroup
                      xs="7"
                      md="7"
                      lg="8"
                      name={`${props.name}.${idx}.id`}
                      className={"mb-0 pr-0" + (idx !== 0 ? " mt-1" : "")}
                      customInvalidCssChecker={() =>
                        props.formikProps.touched[props.name] &&
                        props.formikProps.errors[props.name] &&
                        typeof props.formikProps.errors[props.name] === "string"
                      }
                      selectOptions={[
                        { value: "", label: "Choose...", disabled: true },
                        ...Object.entries(props.products).map((product) => ({
                          value: product[0],
                          label: `${product[1].name} (NCM: ${product[1].ncm})`,
                        })),
                      ]}
                      formikProps={props.formikProps}
                      noLabel
                      noInvalidFeedback
                      isClearable
                    />
                    <FormikGroup
                      name={`${props.name}.${idx}.qty`}
                      type="number"
                      placeholder="Qty"
                      className={"mb-0" + (idx !== 0 ? " pr-0" : "")}
                      customInvalidCssChecker={() =>
                        props.formikProps.touched[props.name] &&
                        props.formikProps.errors[props.name] &&
                        props.formikProps.errors[props.name][idx] &&
                        props.formikProps.errors[props.name][idx].qty
                      }
                      formikProps={props.formikProps}
                      noLabel
                      noInvalidFeedback
                      xs
                    />
                    {idx !== 0 ? (
                      <Col className="pl-0 ml-1" xs="2" md="1">
                        <Button
                          variant="outline-danger"
                          block
                          onClick={() => arrayHelpers.remove(idx)}
                          title="Delete"
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    ) : null}
                  </Form.Row>
                ))
              : null}
            <Button
              variant="outline-primary"
              block
              className="mt-1"
              onClick={() =>
                arrayHelpers.push({
                  id: "",
                  qty: "",
                })
              }
              disabled={props.formikProps.values[props.name].length === 3}
            >
              {props.formikProps.values[props.name].length !== 3 ? (
                "Add Item"
              ) : (
                <span className="font-italic">
                  You have reached the maximum of three items per Docs
                </span>
              )}
            </Button>
          </div>
        )}
      />
      {props.formikProps.touched[props.name] &&
      props.formikProps.errors[props.name] ? (
        <small className="text-danger" style={{ marginTop: "0.25rem" }}>
          {errorMsg}
        </small>
      ) : null}
    </Form.Group>
  );
};

export default FormItems;
