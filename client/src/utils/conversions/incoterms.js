import { INCOTERMS } from "../../const";

export const incotermAbbrToName = (abbr) =>
  INCOTERMS.filter((incoterm) => incoterm[0] === abbr)[0][1];
