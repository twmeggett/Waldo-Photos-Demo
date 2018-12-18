import { fetchUser as amplifyFetchUser } from '../common-ui/Amplify/api';
import { showErrorAlert } from '../common-ui/Alerts/reducers/alerts';

// ------------------------------------
// Constants
// ------------------------------------
const FETCHING = 'store/user/FETCHING';
const DONE_FETCHING = 'store/user/DONE_FETCHING';
const LOAD_DATA = 'store/user/LOAD_DATA';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: {},
  isFetching: false,
  initialized: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case DONE_FETCHING:
      return {
        ...state,
        isFetching: false,
        initialized: true,
      };
    case LOAD_DATA:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        initialized: true,
      };
    default:
      return state;
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetching = () => ({ type: FETCHING });
export const doneFetching = () => ({ type: DONE_FETCHING });
export const load = data => ({ type: LOAD_DATA, data });

// ------------------------------------
// Async Actions
// ------------------------------------
export function fetchUser() {
  return (dispatch) => {
    dispatch(fetching());

    amplifyFetchUser((user) => {
      dispatch(load({
        username: user.username,
        id: user.pool.clientId,
        email: user.attributes.email,
        permittedSites: [...user.signInUserSession.accessToken.payload['cognito:groups'], 'site_map', 'file_upload'],
      }));
    }, (err) => {
      dispatch(showErrorAlert(err));
      dispatch(doneFetching());
    });
  };
}
