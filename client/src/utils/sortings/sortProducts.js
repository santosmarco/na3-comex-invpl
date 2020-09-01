export const sortProducts = (products, exportations) => {
  const genProductKey = (product) => product.description + product.ncm;

  let productsByExportation = exportations.map((exp) =>
    exp.items.map((item) => genProductKey(item))
  );

  let fav = {};
  productsByExportation.forEach((prodArray) => {
    prodArray.forEach((prod) => {
      if (Object.keys(fav).includes(prod)) fav[prod]++;
      else fav[prod] = 1;
    });
  });

  let sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    if (!Object.keys(fav).includes(genProductKey(a))) return 1;
    else if (!Object.keys(fav).includes(genProductKey(b))) return -1;
    else return fav[genProductKey(b)] - fav[genProductKey(a)];
  });

  return sortedProducts;
};
