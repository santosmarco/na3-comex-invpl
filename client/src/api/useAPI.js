import { useFirestore } from "reactfire";
import * as firestoreMethods from "./firestoreMethods";
import * as utils from "../utils";

const useAPI = () => {
  let api = {};
  let firestoreInstance = useFirestore();
  api.firestore = {
    getCollection: (collectionName) =>
      firestoreMethods.getCollection(firestoreInstance, collectionName),
    getCollections: (collectionNames) =>
      firestoreMethods.getCollections(firestoreInstance, collectionNames),
    getFromCollection: (collectionName, documentId) =>
      firestoreMethods.getFromCollection(
        firestoreInstance,
        collectionName,
        documentId
      ),
    addToCollection: (collectionName, document) =>
      firestoreMethods.addToCollection(
        firestoreInstance,
        collectionName,
        document
      ),
    setInCollection: (collectionName, documentId, documentData) =>
      firestoreMethods.setInCollection(
        firestoreInstance,
        collectionName,
        documentId,
        documentData
      ),
  };
  api.firestore = {
    ...api.firestore,
    saveExportationProcess: async (
      processData,
      options = { replace: false }
    ) => {
      let processDoc = await api.firestore.getFromCollection(
        "exportations",
        processData.invoice.number
      );
      let now = new Date();
      if (!processDoc.exists || options.replace) {
        // then process can be created, or replaced
        if (!processDoc.exists) {
          processData.createdAt = now;
        } else {
          processData.updatedAt = now;
        }

        return api.firestore
          .setInCollection(
            "exportations",
            processData.invoice.number,
            processData
          )
          .then(() => ({
            status: "success",
            message: `Process ${processData.invoice.number} have been ${
              processDoc.exists ? "updated" : "created"
            } successfully!`,
          }))
          .catch(() => ({
            status: "error",
            message: `There was an error while trying to ${
              processDoc.exists ? "update" : "create"
            } the following process: ${processData.invoice.number}.`,
          }));
      } else {
        return;
      }
    },
    getNextExportationNumber: async () => {
      let exportations = await api.firestore.getCollection("exportations");
      if (Object.keys(exportations).length === 0) {
        return utils.formatDocNumber(1);
      }
      return utils.formatDocNumber(
        parseInt(
          Math.max(
            ...Object.keys(exportations).map((exportationNumber) =>
              parseInt(exportationNumber.slice(5))
            )
          )
            .toString()
            .slice(2)
        ) + 1
      );
    },
  };

  return api;
};

export default useAPI;
