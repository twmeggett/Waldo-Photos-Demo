import React from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from './ErrorAlert';

class AlertsWrapper extends React.Component {
  static propTypes = {
    showError: PropTypes.bool,
    turnOffAlerts: PropTypes.func,
    alertMsg: PropTypes.string,
  };

  render() {
    return (
      <section>
        <ErrorAlert open={this.props.showError} turnOffAlerts={this.props.turnOffAlerts} alertMsg={this.props.alertMsg} />
      </section>
    );
  }
}

export default AlertsWrapper;
