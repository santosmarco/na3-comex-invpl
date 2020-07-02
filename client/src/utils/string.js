export const camelCaseToTitle = (camelCaseString) => {
  let title = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  title[0] = title[0].slice(0, 1).toUpperCase() + title[0].slice(1);
  title = title.join(" ");

  return title;
};
