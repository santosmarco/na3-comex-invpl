import React from "react";
import PropTypes from "prop-types";
import DocContainer from "./components/DocContainer/DocContainer";
import InvGoods from "./components/InvGoods/InvGoods";
import InvTotals from "./components/InvTotals/InvTotals";
import DocSayTotal from "./components/DocSayTotal/DocSayTotal";
import InvFooter from "./components/InvFooter/InvFooter";
import DocWatermark from "./components/DocWatermark/DocWatermark";

const Invoice = (props) => {
  return (
    <DocContainer
      headerData={{
        title: "INVOICE",
        number: props.data.number,
        date: props.data.date,
        orderNumber: props.data.orderNumber,
      }}
      toData={props.data.to}
      signeeData={props.data.signee}
      printing={props.printing}
    >
      <InvGoods data={{ items: props.data.items }} />
      <InvTotals
        data={{
          incoterm: props.data.incoterm,
          weight: props.data.weight,
          price: props.data.totals,
        }}
      />
      <DocSayTotal total={props.data.totals.invoiceTotal} type="currency" />
      <InvFooter
        data={{
          paymentTerms: props.data.paymentTerms,
          notes: props.data.notes,
          docNumber: props.data.number,
        }}
      />
      {!props.data.withCommercialValue ? (
        <DocWatermark fontSize="550%">NO COMMERCIAL VALUE</DocWatermark>
      ) : null}
    </DocContainer>
  );
};

Invoice.propTypes = {
  data: PropTypes.object.isRequired,
  printing: PropTypes.bool,
};

export default Invoice;
