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

import { genTestDocs } from "./test";

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

  useEffect(loadApp, []);

  if (!(props.database.ready && props.database.sorted)) {
    return <FullPageLoading />;
  } else {
    if (props.testMode && !docsData) {
      runGenerator(genTestDocs());
    }
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

export default (props) => (
  <SuspenseWithPerf fallback={<FullPageLoading />} traceId={"first-load"}>
    <App {...props} />
  </SuspenseWithPerf>
);
