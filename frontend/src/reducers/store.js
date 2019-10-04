import {SET_FILTER, SET_LOCATIONS, SET_SELECTED_STORE} from "../actions/actionTypes";

const initialState = {
    locations: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATIONS: {
            const { locations } = action.payload;
            const tableLocations = [ ...locations].map(store => {
                return { name: store.name, number: store.number, latitude: store.geometry.location.lat, longitude: store.geometry.location.lng }
            });
            return {
                ...state,
                locations: tableLocations
            };
        }
        case SET_FILTER: {
            const { filter } = action.payload;
            return {
                ...state,
                filter
            };
        }
        case SET_SELECTED_STORE: {
            const { selected } = action.payload;
            return {
                ...state,
                selected
            };
        }
        default:
            return state;
    }
}
