import * as actionTypes from "./actionTypes";

export const setDatabaseCollections = (collections, makeReady = false) => ({
  type: actionTypes.DATABASE_SET_COLLECTIONS,
  collections,
});

export const makeDatabaseReady = () => ({
  type: actionTypes.DATABASE_MAKE_READY,
});

export const makeDatabaseUnready = () => ({
  type: actionTypes.DATABASE_MAKE_UNREADY,
});

export const makeDatabaseSorted = () => ({
  type: actionTypes.DATABASE_MAKE_SORTED,
});

export const makeDatabaseUnsorted = () => ({
  type: actionTypes.DATABASE_MAKE_UNSORTED,
});

export const sortDatabase = () => ({
  type: actionTypes.DATABASE_SORT_COLLECTIONS,
});

export const initDatabase = (collections, sort = true) => {
  return (dispatch) => {
    dispatch(setDatabaseCollections(collections));
    dispatch(makeDatabaseReady());
    if (sort) dispatch(sortDatabase());
  };
};
