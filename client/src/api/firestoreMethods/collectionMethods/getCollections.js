import { getCollection } from "./getCollection";

export const getCollections = async (
  firestoreInstance,
  arrayOfCollectionNames
) => {
  let promises = arrayOfCollectionNames.map((collectionName) =>
    getCollection(firestoreInstance, collectionName)
  );
  return Promise.all(promises).then((values) => {
    let docs = {};
    values.forEach((value, idx) => {
      docs[arrayOfCollectionNames[idx]] = value;
    });
    return docs;
  });
};
