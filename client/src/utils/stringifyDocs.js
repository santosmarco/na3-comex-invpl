import { formatCurrency, formatNumber, formatInteger } from ".";

export const stringifyInvoice = (invoice) => ({
  ...invoice,
  items: invoice.items.map((item) => ({
    ...item,
    qty: formatNumber(item.qty),
    totalPrice: formatCurrency(item.totalPrice),
    unitPrice: formatCurrency(item.unitPrice),
    unitsPerCtn: formatNumber(item.unitsPerCtn),
  })),
  totals: {
    ...invoice.totals,
    freight: formatCurrency(invoice.totals.freight),
    insurance: formatCurrency(invoice.totals.insurance),
    invoiceTotal: formatCurrency(invoice.totals.invoiceTotal),
    items: formatCurrency(invoice.totals.items),
  },
  weight: {
    ...invoice.weight,
    gross: formatNumber(invoice.weight.gross),
    net: formatNumber(invoice.weight.net),
  },
});

export const stringifyPackingList = (packingList) => ({
  ...packingList,
  items: packingList.items.map((item) => ({
    ...item,
    perCtn: isNaN(item.perCtn) ? item.perCtn : formatInteger(item.perCtn),
    ctnsQty: formatInteger(item.ctnsQty),
    weight: {
      ...item.weight,
      gross: formatNumber(item.weight.gross),
      net: formatNumber(item.weight.net),
    },
  })),
  totals: {
    ...packingList.totals,
    ctns: formatInteger(packingList.totals.ctns),
    volume: formatNumber(packingList.totals.volume, 3),
    weight: {
      ...packingList.totals.weight,
      gross: formatNumber(packingList.totals.weight.gross),
      net: formatNumber(packingList.totals.weight.net),
    },
  },
});

export const stringifyDocs = (docs) => ({
  invoice: stringifyInvoice(docs.invoice),
  packingList: stringifyPackingList(docs.packingList),
});
