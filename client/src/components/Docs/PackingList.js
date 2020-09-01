import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import DocContainer from "./components/DocContainer/DocContainer";
import PLGoods from "./components/PLGoods/PLGoods";
import PLCartonSpecs from "./components/PLCartonSpecs/PLCartonSpecs";
import PLTotals from "./components/PLTotals/PLTotals";
import DocSayTotal from "./components/DocSayTotal/DocSayTotal";
import PLFooter from "./components/PLFooter/PLFooter";
import Form from "react-bootstrap/Form";

const PackingList = (props) => {
  return (
    <DocContainer
      headerData={{
        title: "PACKING LIST",
        number: props.data.number,
        date: props.data.date,
        orderNumber: props.data.orderNumber,
      }}
      toData={props.data.to}
      signData={{
        signee: props.data.signee,
        numOfItems: props.data.items.length,
      }}
      printing={props.printing}
    >
      <PLGoods data={{ items: props.data.items }} />
      <Form.Row
        className="mt-2"
        style={{ marginLeft: "-15px", marginRight: "-15px" }}
      >
        <Col className="pl-0">
          <PLCartonSpecs cartonData={props.data.carton} />
        </Col>
        <Col xs="5" className="pr-0">
          <PLTotals data={props.data.totals} />
        </Col>
      </Form.Row>
      <DocSayTotal
        description="Carton Boxes"
        total={props.data.totals.ctns}
        type="carton"
      />
      <PLFooter />
    </DocContainer>
  );
};

PackingList.propTypes = {
  data: PropTypes.object.isRequired,
  printing: PropTypes.bool,
};

export default PackingList;
