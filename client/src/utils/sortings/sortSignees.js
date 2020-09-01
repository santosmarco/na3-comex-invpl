export const sortSignees = (signees, exportations) => {
  let signeesByExportation = exportations.map((exp) => exp.signee.name);

  let fav = {};
  signeesByExportation.forEach((ctt) => {
    if (Object.keys(fav).includes(ctt)) fav[ctt]++;
    else fav[ctt] = 1;
  });

  let sortedSignees = [...signees];
  sortedSignees.sort((a, b) => {
    if (!Object.keys(fav).includes(a.name)) return 1;
    else if (!Object.keys(fav).includes(b.name)) return -1;
    else return fav[b.name] - fav[a.name];
  });

  return sortedSignees;
};
