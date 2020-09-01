export const sortContacts = (contacts, exportations) => {
  let contactsByExportation = exportations.map((exp) => exp.to.name);

  let fav = {};
  contactsByExportation.forEach((ctt) => {
    if (Object.keys(fav).includes(ctt)) fav[ctt]++;
    else fav[ctt] = 1;
  });

  let sortedContacts = [...contacts];
  sortedContacts.sort((a, b) => fav[b.name] - fav[a.name]);

  return sortedContacts;
};
