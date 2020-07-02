import numToWords from "number-to-words";

export const sayTotal = (total, type = "currency") => {
  let totalStr = typeof total === "string" ? total : total.toString();
  let integer;
  if (type === "carton") {
    integer = totalStr.replace(",", "");
    return (numToWords.toWords(+integer) + " Carton boxes exactly")
      .split(" ")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ")
      .split("-")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join("-");
  }

  let decimal;
  if (totalStr.match(/\./g)) {
    integer = totalStr.slice(0, totalStr.indexOf("."));
    decimal = totalStr.slice(totalStr.indexOf(".") + 1);
    if (decimal.length === 1) {
      decimal += "0";
    }
  } else {
    integer = totalStr;
  }
  integer = integer.replace(",", "");
  let res = numToWords.toWords(+integer) + " US Dollars";

  if (decimal) {
    res += " and " + numToWords.toWords(+decimal) + " cents";
  }

  res += " exactly";

  res = res
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ")
    .split("-")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join("-");

  return res;
};
