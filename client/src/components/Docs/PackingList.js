import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DocContainer from "./components/DocContainer/DocContainer";
import PLGoods from "./components/PLGoods/PLGoods";
import PLCartonSpecs from "./components/PLCartonSpecs/PLCartonSpecs";
import PLTotals from "./components/PLTotals/PLTotals";
import DocSayTotal from "./components/DocSayTotal/DocSayTotal";
import PLFooter from "./components/PLFooter/PLFooter";

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
      signeeData={props.data.signee}
      printing={props.printing}
    >
      <PLGoods data={{ items: props.data.items }} />
      <Row className="mt-2">
        <Col className="pl-0">
          <PLCartonSpecs />
        </Col>
        <Col xs="4" className="pr-0">
          <PLTotals data={props.data.totals} />
        </Col>
      </Row>
      <DocSayTotal total={props.data.totals.ctns} type="carton" />
      <PLFooter />
    </DocContainer>
  );
};

PackingList.propTypes = {
  data: PropTypes.object.isRequired,
  printing: PropTypes.bool,
};

export default PackingList;
