import { SET_LOCATIONS, SET_FILTER, SET_SELECTED_STORE } from "./actionTypes";

export const setStores = locations => ({
    type: SET_LOCATIONS,
    payload: { locations }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const setSelectedStore = selected => ({ type: SET_SELECTED_STORE, payload: { selected } });
