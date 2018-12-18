import { connect } from 'react-redux';
import AlertsWrapper from '../components/AlertsWrapper';
import { turnOffAlerts } from '../reducers/alerts';

const mapStateToProps = state => {
  return {
    showInfo: state.alerts.showInfo,
    showError: state.alerts.showError,
    showUpdate: state.alerts.showUpdate,
    showLockedOut: state.alerts.showLockedOut,
    showFileUploader: state.alerts.showFileUploader,
    alertMsg: state.alerts.alertMsg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    turnOffAlerts: () => {
      dispatch(turnOffAlerts());
    },
  };
};

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertsWrapper);

export default AlertsContainer;
