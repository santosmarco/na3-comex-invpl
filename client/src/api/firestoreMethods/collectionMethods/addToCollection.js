export const addToCollection = (
  firestoreInstance,
  collectionName,
  document
) => {
  return firestoreInstance
    .collection(collectionName)
    .add(document)
    .then((docRef) => {
      let doc = { id: docRef.id };
      return doc;
    });
};
