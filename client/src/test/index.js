export const genTestDocs = () => ({
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
      qty: 3024,
    },
  ],
  incoterm: "CFR",
  freightPrice: 0,
  insuranceRate: 0,
  paymentTerms: "T/T within 120 days from the date of shipment (B/L date)",
  invoiceNotes: [],
  withCommercialValue: true,
  signee: {
    name: "Marco A Santos",
    dpt: "Foreign Trade",
    role: "Manager",
    displayName: "Marco Aurelio",
  },
});
