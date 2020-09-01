import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as Formik from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import FormikGroup from "./components/FormikGroup/FormikGroup";
import FormItems from "./components/FormItems/FormItems";
import FormModal, { NumberWarningModal } from "./components/FormModals";
import * as utils from "../../utils";
import * as constants from "../../const";

let INCOTERMS = constants.INCOTERMS.map((incoterm) => incoterm[0]);

const TODAY = moment();

const GeneratorForm = (props) => {
  const [nextExportationNumber] = useState(
    utils
      .getNextExportationNumber(props.database.collections.exportations)
      .slice(7)
  );
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);

  const formatValues = (values) => {
    let formatted = {
      ...values,
      number: utils.formatDocNumber(values.number),
      orderNumber:
        values.orderNumber.trim() === "" ? "N/A" : values.orderNumber.trim(),
      date: moment(values.date).format("DD/MMM/YYYY"),
      to: props.database.collections.contacts[values.to],
      items: values.items
        .filter((item) => item.id !== "")
        .map((item) => ({
          ...props.database.collections.products[item.id],
          qty: item.qty,
        })),
      freightPrice:
        typeof values.freightPrice === "string"
          ? 0
          : parseFloat(values.freightPrice),
      insurancePrice:
        typeof values.insurancePrice === "string"
          ? 0
          : parseFloat(values.insurancePrice),
      invoiceNotes:
        values.invoiceNotes.trim() === ""
          ? []
          : values.invoiceNotes
              .split(";")
              .map((note) => note.trim())
              .filter((note) => note !== ""),
      withCommercialValue: values.withCommercialValue === "true",
      signee: props.database.collections.signees[parseInt(values.signee)],
    };

    return formatted;
  };

  const valuesToUnorderedList = (formValues) => {
    let values = formatValues(formValues);

    values = {
      ...values,
      to: values.to ? values.to.name : "None",
      items:
        values.items.length === 0
          ? "None"
          : values.items
              .map((value) => `${value.qty}x ${value.name}`)
              .join(", "),
      freightPrice: "USD " + utils.formatCurrency(values.freightPrice),
      insurancePrice: "USD " + utils.formatCurrency(values.insurancePrice),
      invoiceNotes:
        values.invoiceNotes.length === 0
          ? "None"
          : values.invoiceNotes.join("; "),
      withCommercialValue: values.withCommercialValue ? "Yes" : "No",
      signee: values.signee.displayName,
    };

    return (
      <ul>
        {Object.entries(values).map((value) => (
          <li key={value[0]}>
            <strong>{utils.camelCaseToTitle(value[0])}:</strong> {value[1]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Formik.Formik
      initialValues={{
        number: nextExportationNumber,
        orderNumber: "",
        date: TODAY.format("yyyy-MM-DD"),
        to: "",
        items: [{ id: "", qty: "" }],
        incoterm: "FOB",
        freightPrice: "",
        insurancePrice: "",
        paymentTerms:
          "T/T within 120 days from the date of shipment (B/L date)",
        invoiceNotes: "",
        withCommercialValue: "true",
        signee: "0",
      }}
      validationSchema={Yup.object({
        number: Yup.number()
          .integer("Must be an integer")
          .min(1, "Must be greater than or equal to 1")
          .max(999, "Must be less than or equal to 999")
          .required("Required"),
        orderNumber: Yup.string().max(
          15,
          "Must be less than or equal to 15 characters long"
        ),
        to: Yup.string().min(1, "Required").required("Required"),
        items: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string(),
              qty: Yup.number().when("id", {
                is: (id) => id !== undefined,
                then: Yup.number().moreThan(0).required(),
                otherwise: Yup.number(),
              }),
            })
          )
          .test(
            "has-at-least-one-item-with-id",
            "You must select at least one item",
            (items) => items.some((item) => item.id)
          ),
        freightPrice: Yup.number().min(0, "Must be non-negative"),
        insurancePrice: Yup.number().min(0, "Must be non-negative"),
      })}
      onSubmit={() => setShowConfirmModal(true)}
    >
      {(formikProps) => {
        // console.log(formikProps);
        return (
          <Formik.Form>
            <Form.Row>
              <FormikGroup
                name="number"
                type="number"
                formikProps={formikProps}
                required
                inputGroupConfig={{ prepends: ["NOVA-" + TODAY.format("YY")] }}
              />
              <FormikGroup
                name="orderNumber"
                formikProps={formikProps}
                placeholder="N/A"
              />
              <FormikGroup
                name="date"
                type="date"
                formikProps={formikProps}
                required
              />
            </Form.Row>
            <Form.Row>
              <FormikGroup
                name="to"
                labelConfig={{ show: "Addressee" }}
                selectOptions={[
                  { value: "", label: "Choose...", disabled: true },
                  ...props.database.collections.contacts.map(
                    (contact, idx) => ({
                      value: idx,
                      label: `${contact.name} (${contact.vat.abbr}: ${contact.vat.number})`,
                    })
                  ),
                ]}
                formikProps={formikProps}
                isClearable
                required
              />
            </Form.Row>
            <Form.Row>
              <FormItems
                name="items"
                products={Object.assign(
                  {},
                  props.database.collections.products
                )}
                formikProps={formikProps}
                required
              />
            </Form.Row>
            <Form.Row>
              <FormikGroup
                name="incoterm"
                selectOptions={INCOTERMS.map((incoterm) => ({
                  value: incoterm,
                  label: `${incoterm} (${utils.incotermAbbrToName(incoterm)})`,
                }))}
                formikProps={formikProps}
                required
              />
              <FormikGroup
                name="freightPrice"
                type="number"
                labelConfig={{ show: "Additional Costs", hide: ": Freight" }}
                placeholder="0.00"
                inputGroupConfig={{ prepends: ["Freight"], appends: ["USD"] }}
                formikProps={formikProps}
              />
              <FormikGroup
                name="insurancePrice"
                type="number"
                labelConfig={{ hide: "Additional Costs: Insurance" }}
                placeholder="0.00"
                inputGroupConfig={{ prepends: ["Insurance"], appends: ["USD"] }}
                formikProps={formikProps}
              />
            </Form.Row>
            <Form.Row>
              <FormikGroup
                name="paymentTerms"
                as="textarea"
                rows="2"
                placeholder="T/T within 120 days from the date of shipment (B/L date)"
                formikProps={formikProps}
              />
              <FormikGroup
                name="invoiceNotes"
                as="textarea"
                rows="2"
                fieldHelp={'Use ";" to split notes'}
                formikProps={formikProps}
              />
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Accordion>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    className="p-0"
                    eventKey="0"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  >
                    <h6 className="m-0">
                      {showAdvancedOptions ? "Hide" : "Show"} advanced options
                    </h6>
                  </Accordion.Toggle>
                  <Accordion.Collapse className="mt-2" eventKey="0">
                    <Card className="bg-dark text-light">
                      <Card.Body>
                        <Form.Row>
                          <FormikGroup
                            name="withCommercialValue"
                            selectOptions={[
                              { value: "true", label: "Yes" },
                              { value: "false", label: "No" },
                            ]}
                            formikProps={formikProps}
                            required
                          />
                          <FormikGroup
                            name="signee"
                            selectOptions={[
                              ...props.database.collections.signees.map(
                                (signee, idx) => ({
                                  value: idx,
                                  label: signee.displayName,
                                })
                              ),
                            ]}
                            formikProps={formikProps}
                            required
                          />
                        </Form.Row>
                      </Card.Body>
                    </Card>
                  </Accordion.Collapse>
                </Accordion>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Col xs="4" md="2" lg="1">
                <Button
                  variant="outline-danger"
                  onClick={() => setShowResetModal(true)}
                  block
                >
                  Reset
                </Button>
              </Col>
              <Col>
                <Button type="submit" variant="primary" block>
                  Generate
                </Button>
              </Col>
            </Form.Row>

            <FormModal
              show={showResetModal}
              onHide={() => setShowResetModal(false)}
              title="Are you sure?"
              message="Are you sure you want to reset the generator?"
              headerBg="danger"
              formValuesAsList={valuesToUnorderedList(formikProps.values)}
              buttons={[
                <Button
                  variant="primary"
                  onClick={() => setShowResetModal(false)}
                >
                  No, take me back
                </Button>,
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    formikProps.resetForm();
                    setShowResetModal(false);
                  }}
                >
                  Yes, reset
                </Button>,
              ]}
            />
            <FormModal
              show={showConfirmModal}
              onHide={() => setShowConfirmModal(false)}
              title="Confirm generation?"
              message="An Invoice and a Packing List will be generated according to the following process information:"
              formValuesAsList={valuesToUnorderedList(formikProps.values)}
              buttons={[
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  No, take me back
                </Button>,
                <Button
                  variant="primary"
                  onClick={() => {
                    if (formikProps.values.number !== nextExportationNumber) {
                      setShowConfirmModal(false);
                      setShowNumberModal(true);
                      return;
                    }
                    props.onGenerate(formatValues(formikProps.values));
                  }}
                >
                  Yes, generate
                </Button>,
              ]}
            />
            <NumberWarningModal
              show={showNumberModal}
              onHide={() => setShowNumberModal(false)}
              nextExportationNumber={nextExportationNumber}
              currentNumber={formikProps.values.number}
              onContinue={(shouldFixNumber = true, shouldReplace = false) =>
                props.onGenerate(
                  formatValues({
                    ...formikProps.values,
                    number: shouldFixNumber
                      ? nextExportationNumber
                      : formikProps.values.number,
                  }),
                  { database: { replace: shouldReplace } }
                )
              }
            />
          </Formik.Form>
        );
      }}
    </Formik.Formik>
  );
};

const mapStateToProps = (state) => ({ database: state.database });

export default connect(mapStateToProps)(GeneratorForm);
