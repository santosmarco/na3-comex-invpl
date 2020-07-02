import moment from "moment";

export const formatDocNumber = (num, yearPrefix = moment().format("YY")) => {
  const pad = (num) => {
    var s = num + "";
    while (s.length < 3) s = "0" + s;
    return s;
  };

  return "NOVA-" + yearPrefix + pad(num);
};

export const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(num)
    .slice(1);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatInteger = (num) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(num);
};
