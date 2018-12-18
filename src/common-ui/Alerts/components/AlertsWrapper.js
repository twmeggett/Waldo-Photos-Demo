import React from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from './ErrorAlert';
import InfoAlert from './InfoAlert';

class AlertsWrapper extends React.Component {
  static propTypes = {
    showError: PropTypes.bool,
    showInfo: PropTypes.bool,
    turnOffAlerts: PropTypes.func,
    alertMsg: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    return (
      <section>
        <ErrorAlert open={this.props.showError} turnOffAlerts={this.props.turnOffAlerts} alertMsg={this.props.alertMsg} />
        <InfoAlert open={this.props.showInfo} turnOffAlerts={this.props.turnOffAlerts} title={this.props.title} alertMsg={this.props.alertMsg} />
      </section>
    );
  }
}

export default AlertsWrapper;
