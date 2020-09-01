import * as utils from "./";

export const getNextExportationNumber = (exportations) =>
  exportations.length === 0
    ? utils.formatDocNumber(1)
    : utils.formatDocNumber(
        parseInt(
          Math.max(
            ...exportations.map((exportation) =>
              parseInt(exportation.id.slice(5))
            )
          )
            .toString()
            .slice(2)
        ) + 1
      );
