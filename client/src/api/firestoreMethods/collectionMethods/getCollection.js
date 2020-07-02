export const getCollection = (firestoreInstance, collectionName) => {
  return firestoreInstance
    .collection(collectionName)
    .get()
    .then((querySnapshot) => {
      let docs = {};
      querySnapshot.forEach((doc) => {
        docs[doc.id] = doc.data();
      });
      return docs;
    });
};
