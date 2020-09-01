export const generateInvoiceData = (formData) => {
  let invoice = {
    number: formData.number,
    date: formData.date,
    orderNumber: formData.orderNumber,
    to: formData.to,
    items: formData.items.map((item) => ({
      description: item.description,
      ncm: item.ncm,
      qty: item.qty,
      unit: item.defaultUnit,
      unitsPerCtn: item.unitsPerCtn,
      unitPrice:
        item.defaultUnitPrice -
        (formData.freightPrice + formData.insurancePrice) / item.qty,
      totalPrice:
        item.defaultUnitPrice * item.qty -
        (formData.freightPrice + formData.insurancePrice),
    })),
    weight: {
      net: formData.items.reduce(
        (totalNetWeight, item) =>
          totalNetWeight + item.defaultUnitWeight * item.qty,
        0
      ),
      // gross is calculated and added later
    },
    incoterm: formData.incoterm,
    totals: {
      // items total is calculated and added later
      freight: formData.freightPrice,
      insurance: formData.insurancePrice,
      // invoice total is calculated and added later
    },
    paymentTerms: formData.paymentTerms,
    notes: formData.invoiceNotes,
    withCommercialValue: formData.withCommercialValue,
    signee: formData.signee,
  };

  invoice = {
    ...invoice,
    weight: {
      ...invoice.weight,
      gross:
        invoice.weight.net +
        invoice.items.reduce(
          (totalCtns, item) => totalCtns + item.qty / item.unitsPerCtn,
          0
        ) *
          formData.carton.defaultUnitWeight,
    },
    totals: {
      ...invoice.totals,
      items: invoice.items.reduce(
        (itemsTotal, item) => itemsTotal + item.totalPrice,
        0
      ),
    },
  };

  invoice = {
    ...invoice,
    totals: {
      ...invoice.totals,
      invoiceTotal: Object.values(invoice.totals).reduce(
        (invoiceTotal, individualTotal) => invoiceTotal + individualTotal,
        0
      ),
    },
  };

  return invoice;
};

export const generatePackingListData = (formData) => {
  let packingList = {
    number: formData.number,
    date: formData.date,
    orderNumber: formData.orderNumber,
    to: formData.to,
    items: formData.items.map((item) => ({
      description: item.description,
      marksNumbers: item.marksNumbers,
      perCtn:
        item.defaultUnit === "Thousands" ? item.unitsPerCtn * 1000 : "N/A",
      ctnsQty: item.qty / item.unitsPerCtn,
      ncm: item.ncm,
      weight: {
        net: item.defaultUnitWeight * item.qty,
        gross:
          item.defaultUnitWeight * item.qty +
          (item.qty / item.unitsPerCtn) * formData.carton.defaultUnitWeight,
      },
      // totals are calculated and added later
    })),
    signee: formData.signee,
    carton: formData.carton,
  };

  packingList = {
    ...packingList,
    totals: {
      ctns: packingList.items.reduce(
        (totalCtns, item) => totalCtns + item.ctnsQty,
        0
      ),
      // volume is calculated and added later
      weight: {
        net: packingList.items.reduce(
          (totalNetWeight, item) => totalNetWeight + item.weight.net,
          0
        ),
        // gross is calculated and added later
      },
    },
  };

  packingList = {
    ...packingList,
    totals: {
      ...packingList.totals,
      volume: packingList.carton.defaultUnitVolume * packingList.totals.ctns,
      weight: {
        ...packingList.totals.weight,
        gross:
          packingList.totals.weight.net +
          packingList.totals.ctns * packingList.carton.defaultUnitWeight,
      },
    },
  };

  return packingList;
};

export const generateDocsData = (formData) => ({
  invoice: generateInvoiceData(formData),
  packingList: generatePackingListData(formData),
});
