// ------------------------------------
// Constants
// ------------------------------------
const SHOW_INFO_ALERT = 'common-ui/alerts/reducers/alerts/SHOW_INFO_ALERT';
const SHOW_ERROR_ALERT = 'common-ui/alerts/reducers/alerts/SHOW_ERROR_ALERT';
const SHOW_UPDATE_ALERT = 'common-ui/alerts/reducers/alerts/SHOW_UPDATE_ALERT';
const SHOW_PERMISSIONS_ALERT = 'common-ui/alerts/reducers/alerts/SHOW_PERMISSIONS_ALERT';
const SHOW_FILE_UPLOADER = 'common-ui/alerts/reducers/alerts/SHOW_FILE_UPLOADER';
const TURN_OFF_ALERTS = 'common-ui/alerts/reducers/alerts/TURN_OFF_ALERTS';
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  showError: false,
  showInfo: false,
  showUpdate: false,
  showLockedOut: false,
  showFileUploader: false,
  title: '',
  alertMsg: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR_ALERT:
      return {
        ...initialState,
        showError: true,
        alertMsg: action.errorMsg,
      };
    case SHOW_INFO_ALERT:
      return {
        ...initialState,
        showInfo: true,
        title: action.title,
        alertMsg: action.msg,
      };
    case SHOW_UPDATE_ALERT:
      return {
        ...initialState,
        showUpdate: true,
      };
    case SHOW_PERMISSIONS_ALERT:
      return {
        ...initialState,
        showLockedOut: true,
      };
    case SHOW_FILE_UPLOADER:
      return {
        ...initialState,
        showFileUploader: true,
      };
    case TURN_OFF_ALERTS:
      return initialState;
    default:
      return state;
  }
};
// ------------------------------------
// Actions
// ------------------------------------
export const showErrorAlert = errorMsg => ({ type: SHOW_ERROR_ALERT, errorMsg });
export const showInfoAlert = (title, msg) => ({ type: SHOW_INFO_ALERT, title, msg });
export const showUpdateAlert = () => ({ type: SHOW_UPDATE_ALERT });
export const showPermissionsAlert = () => ({ type: SHOW_PERMISSIONS_ALERT });
export const showFileUploader = () => ({ type: SHOW_FILE_UPLOADER });
export const turnOffAlerts = () => ({ type: TURN_OFF_ALERTS });

export default reducer;
