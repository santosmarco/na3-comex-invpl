export const getFromCollection = (
  firestoreInstance,
  collectionName,
  documentId
) => {
  return firestoreInstance
    .collection(collectionName)
    .doc(documentId)
    .get()
    .then((docRef) => {
      if (docRef.exists) {
        return { exists: docRef.exists, id: docRef.id, ...docRef.data() };
      } else {
        return {
          exists: docRef.exists,
          error: `Document "${documentId}" does not exist in collection "${collectionName}"`,
        };
      }
    });
};
