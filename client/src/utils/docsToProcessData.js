export const docsToProcessData = (docsData) => {
  return {
    ...docsData,
    number: docsData.invoice.number,
    date: docsData.invoice.date,
    orderNumber: docsData.invoice.orderNumber,
    to: docsData.invoice.to,
    signee: docsData.invoice.signee,
    items: docsData.invoice.items.map((item, idx) => ({
      ...item,
      ...docsData.packingList.items[idx],
    })),
    totals: {
      price: docsData.invoice.totals,
      weight: docsData.packingList.totals.weight,
      ctns: docsData.packingList.totals.ctns,
    },
  };
};
