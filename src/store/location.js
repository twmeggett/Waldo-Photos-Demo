import browserHistory from 'react-router/lib/browserHistory';

// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location,
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation));
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = browserHistory.getCurrentLocation();
export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
