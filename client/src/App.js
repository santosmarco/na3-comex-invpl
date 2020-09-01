import React, { Fragment, useState, useEffect } from "react";
import { SuspenseWithPerf } from "reactfire";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import Container from "react-bootstrap/Container";
import FullPageLoading from "./components/FullPageLoading/FullPageLoading";
import GeneratorForm from "./components/GeneratorForm/GeneratorForm";
import SuccessCard from "./components/SuccessCard/SuccessCard";
import MessagesFlasher from "./components/MessagesFlasher/MessagesFlasher";
import { BrowserModal } from "./components/Modals";
import Invoice from "./components/Docs/Invoice";
import PackingList from "./components/Docs/PackingList";
import * as utils from "./utils";
import useAPI from "./api";

let App = (props) => {
  const api = useAPI();
  const [docsData, setDocsData] = useState();
  const [flashMessages, setFlashMessages] = useState([]);

  console.log("dbData =>", props.database);
  console.log("docsData =>", docsData);
  console.log("flashMessages =>", flashMessages);

  const loadApp = () => {
    api.firestore
      .getCollections(Object.keys(props.database.collections))
      .then((docs) => props.initDatabase(docs));
  };

  const isChrome = () =>
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  const pushFlashMessage = (msg) => setFlashMessages([...flashMessages, msg]);

  const runGenerator = (
    formValues,
    options = { database: { replace: false } }
  ) => {
    let newDocsData = utils.generateDocsData({
      ...formValues,
      carton: props.database.collections.cartons.filter(
        (carton) => carton.id === "export"
      )[0],
    });
    api.firestore
      .saveExportationProcess(utils.docsToProcessData(newDocsData), {
        replace: options.database.replace,
      })
      .then((res) =>
        res ? pushFlashMessage({ type: res.status, body: res.message }) : null
      );
    setDocsData(newDocsData);
  };

  const resetGenerator = () => setDocsData(null);

  const printDocs = window.print;

  // useEffect(() => {
  //   if (props.database.ready && props.database.sorted) {
  //     runGenerator(EXAMPLE_DOCS_DATA);
  //   }
  // }, [props.database]);

  useEffect(loadApp, []);

  if (!(props.database.ready && props.database.sorted)) {
    return <FullPageLoading />;
  } else {
    return (
      <Fragment>
        <div
          className="d-print-none d-flex align-items-center justify-content-center bg-blue-primary text-light"
          style={{ minHeight: "100vh" }}
        >
          <Container className="bg-light rounded text-dark p-3 shadow">
            <h4 className="border-bottom pb-2 mb-4">
              Invoice {"&"} Packing List Generator
            </h4>
            {docsData ? (
              <SuccessCard
                processNumber={docsData.invoice.number}
                onPrint={printDocs}
                onRunAgain={resetGenerator}
              />
            ) : (
              <GeneratorForm onGenerate={runGenerator} />
            )}
          </Container>
          {flashMessages.length > 0 ? (
            <MessagesFlasher
              messages={flashMessages}
              messagesSetter={setFlashMessages}
            />
          ) : null}
        </div>
        {docsData ? (
          <Fragment>
            <div style={{ pageBreakAfter: "always" }}>
              <Invoice data={utils.stringifyInvoice(docsData.invoice)} />
            </div>
            <div style={{ pageBreakAfter: "never" }}>
              <PackingList
                data={utils.stringifyPackingList(docsData.packingList)}
              />
            </div>
          </Fragment>
        ) : null}
        <BrowserModal show={!isChrome()} />
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => ({ database: state.database });

const mapDispatchToProps = (dispatch) => ({
  setDatabaseCollections: (collections) =>
    dispatch(actions.setDatabaseCollections(collections)),
  initDatabase: (collections) => dispatch(actions.initDatabase(collections)),
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => (
  <SuspenseWithPerf fallback={<FullPageLoading />} traceId={"first-load"}>
    <App />
  </SuspenseWithPerf>
);

// const EXAMPLE_DOCS_DATA = {
//   number: "NOVA-20008",
//   orderNumber: "N/A",
//   date: "27/Jun/2020",
//   to: {
//     name: "NOVA A3 México, S. de R.L. de C.V.",
//     state: "Querétaro",
//     vat: { number: "NAM1308212U4", abbr: "RFC" },
//     nickname: "Nova A3 México",
//     zip: "76220",
//     city: "Santa Rosa Jauregui",
//     street: [
//       "Carretera Querétaro - San Luis do Potosí, 16368",
//       "Bodegas 26 y 27",
//     ],
//     country: "México",
//   },
//   items: [
//     {
//       description:
//         "FOLLETO IMPRESSO LOREAL COR INTENSA (Formato 225 x 280) + GUANTES",
//       defaultUnit: "Thousands",
//       marksNumbers: "NOVA A3 N/M",
//       name: "L'Oreal Cor Intensa",
//       defaultUnitPrice: 28,
//       unitsPerCtn: 2,
//       defaultUnitWeight: 5.5875,
//       ncm: "4911.10.90",
//       qty: 3024,
//     },
//   ],
//   incoterm: "CFR",
//   freightPrice: 0,
//   insurancePrice: 0,
//   paymentTerms: "T/T within 120 days from the date of shipment (B/L date)",
//   invoiceNotes: [],
//   withCommercialValue: true,
//   signee: {
//     name: "Marco A Santos",
//     dpt: "Foreign Trade",
//     role: "Manager",
//     displayName: "Marco Aurelio",
//   },
// };
