export const setInCollection = (
  firestoreInstance,
  collectionName,
  documentId,
  documentData
) => {
  return firestoreInstance
    .collection(collectionName)
    .doc(documentId)
    .set(documentData);
};
