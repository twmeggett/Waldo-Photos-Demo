import { connect } from 'react-redux';
import AlertsWrapper from '../components/AlertsWrapper';
import { turnOffAlerts } from '../reducers/alerts';

const mapStateToProps = state => {
  return {
    showError: state.alerts.showError,
    showInfo: state.alerts.showInfo,
    showUpdate: state.alerts.showUpdate,
    showLockedOut: state.alerts.showLockedOut,
    showFileUploader: state.alerts.showFileUploader,
    title: state.alerts.title,
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
