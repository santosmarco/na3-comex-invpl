import * as actionTypes from "../actions/actionTypes";
import * as utils from "../../utils";

const initialState = {
  collections: {
    contacts: null,
    products: null,
    cartons: null,
    exportations: null,
    signees: null,
  },
  ready: false,
  sorted: false,
};

const sortDatabaseCollections = (database) => {
  if (!database.ready) return;

  return {
    ...database,
    collections: {
      ...database.collections,
      contacts: utils.sortContacts(
        database.collections.contacts,
        database.collections.exportations
      ),
      products: utils.sortProducts(
        database.collections.products,
        database.collections.exportations
      ),
      signees: utils.sortSignees(
        database.collections.signees,
        database.collections.exportations
      ),
    },
    sorted: true,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATABASE_SET_COLLECTIONS:
      return { ...state, collections: action.collections };
    case actionTypes.DATABASE_MAKE_READY:
      return { ...state, ready: true };
    case actionTypes.DATABASE_MAKE_UNREADY:
      return { ...state, ready: false };
    case actionTypes.DATABASE_MAKE_SORTED:
      return { ...state, sorted: true };
    case actionTypes.DATABASE_MAKE_UNSORTED:
      return { ...state, sorted: false };
    case actionTypes.DATABASE_SORT_COLLECTIONS:
      return sortDatabaseCollections(state);
    default:
      return state;
  }
};
