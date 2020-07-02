import React, { Fragment, useState, useEffect } from "react";
import { SuspenseWithPerf } from "reactfire";
import Container from "react-bootstrap/Container";
import FullPageLoading from "./components/FullPageLoading/FullPageLoading";
import GeneratorForm from "./components/GeneratorForm/GeneratorForm";
import SuccessCard from "./components/SuccessCard/SuccessCard";
import Invoice from "./components/Docs/Invoice";
import PackingList from "./components/Docs/PackingList";
import * as utils from "./utils";
import useAPI from "./api";

// useFirestore()
//   .collection("contacts")
//   .add({
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
//   });

const EXAMPLE_DOCS_DATA = {
  number: "NOVA-20008",
  orderNumber: "N/A",
  date: "27/Jun/2020",
  to: {
    name: "NOVA A3 México, S. de R.L. de C.V.",
    state: "Querétaro",
    vat: { number: "NAM1308212U4", abbr: "RFC" },
    nickname: "Nova A3 México",
    zip: "76220",
    city: "Santa Rosa Jauregui",
    street: [
      "Carretera Querétaro - San Luis do Potosí, 16368",
      "Bodegas 26 y 27",
    ],
    country: "México",
  },
  items: [
    {
      description:
        "FOLLETO IMPRESSO LOREAL COR INTENSA (Formato 225 x 280) + GUANTES",
      defaultUnit: "Thousands",
      marksNumbers: "NOVA A3 N/M",
      name: "L'Oreal Cor Intensa",
      defaultUnitPrice: 28,
      unitsPerCtn: 2,
      defaultUnitWeight: 5.5875,
      ncm: "4911.10.90",
      qty: 1512,
    },
  ],
  incoterm: "CFR",
  freightPrice: 0,
  insurancePrice: 0,
  paymentTerms: "T/T within 120 days from the date of shipment (B/L date)",
  invoiceNotes: [],
  withCommercialValue: false,
  signee: {
    name: "Marco A Santos",
    dpt: "Foreign Trade",
    role: "Manager",
    displayName: "Marco Aurelio",
  },
};

const App = (props) => {
  const api = useAPI();
  const [contacts, setContacts] = useState();
  const [products, setProducts] = useState();
  const [cartons, setCartons] = useState();
  const [docsData, setDocsData] = useState();
  const [printingStatus, setPrintingStatus] = useState({
    invoice: true,
    packingList: true,
    doPrinting: false,
  });

  console.log("dbData =>", { contacts, products, cartons });
  console.log("docsData =>", docsData);

  const isAppReady = () => contacts && products && cartons;

  const runGenerator = (formValues) => {
    let newDocsData = utils.generateDocsData({
      ...formValues,
      carton: cartons.export,
    });
    api.firestore.saveExportationProcess(utils.docsToProcessData(newDocsData));
    setDocsData(newDocsData);
  };

  const resetGenerator = () => setDocsData(null);

  const printInvoice = () => {
    setPrintingStatus({
      invoice: true,
      packingList: false,
      doPrinting: true,
    });
  };

  const printPackingList = () => {
    setPrintingStatus({
      invoice: false,
      packingList: true,
      doPrinting: true,
    });
  };

  const printBoth = () => {
    setPrintingStatus({
      invoice: true,
      packingList: true,
      doPrinting: true,
    });
  };

  useEffect(() => {
    if (printingStatus.doPrinting) {
      window.print();
    }
    return () =>
      setPrintingStatus({
        invoice: true,
        packingList: true,
        doPrinting: false,
      });
  }, [printingStatus.doPrinting]);

  // useEffect(() => {
  //   if (contacts && products && cartons) {
  //     runGenerator(EXAMPLE_DOCS_DATA);
  //   }
  //   // eslint-disable-next-line
  // }, [contacts, products, cartons]);

  useEffect(() => {
    api.firestore
      .getCollections(["products", "contacts", "cartons"])
      .then((docs) => {
        setProducts(docs.products);
        setContacts(docs.contacts);
        setCartons(docs.cartons);
      });
    // eslint-disable-next-line
  }, []);

  if (!isAppReady()) {
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
                onPrintInvoice={printInvoice}
                onPrintPackingList={printPackingList}
                onPrintBoth={printBoth}
                onRunAgain={resetGenerator}
              />
            ) : (
              <GeneratorForm
                contacts={contacts}
                products={products}
                onGenerate={runGenerator}
              />
            )}
          </Container>
        </div>
        {docsData ? (
          <Fragment>
            <div style={{ pageBreakAfter: "always" }}>
              <Invoice
                data={utils.stringifyInvoice(docsData.invoice)}
                printing={printingStatus.invoice}
              />
            </div>
            <div style={{ pageBreakAfter: "never" }}>
              <PackingList
                data={utils.stringifyPackingList(docsData.packingList)}
                printing={printingStatus.packingList}
              />
            </div>
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
};

export default () => (
  <SuspenseWithPerf fallback={<FullPageLoading />} traceId={"first-load"}>
    <App />
  </SuspenseWithPerf>
);
