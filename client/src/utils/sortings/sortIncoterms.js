export const sortIncoterms = (incotermsArray, exportationsObj) => {
  let favorite = {};
  for (let key in exportationsObj) {
    let item = exportationsObj[key].invoice.incoterm;
    if (Object.keys(favorite).includes(item)) {
      favorite[item]++;
    } else {
      favorite[item] = 1;
    }
  }

  let sortedFavorite = [];
  for (let item in favorite) {
    sortedFavorite.push([item, favorite[item]]);
  }
  sortedFavorite.sort((a, b) => a[1] - b[1]);

  return [
    ...sortedFavorite.map((fav) => fav[0]),
    ...incotermsArray.filter((item) => !Object.keys(favorite).includes(item)),
  ];
};
