import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import BaseModal from './BaseModal';
import { getDict } from '../../Amplify/api';

class ErrorAlert extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    sendFiles: PropTypes.func.isRequired,
    turnOffAlerts: PropTypes.func.isRequired,
  }

  render() {
    return (
      <BaseModal
        open={this.props.open}
        onClose={this.props.turnOffAlerts}
        title={getDict('alerts.error.title')}
        actions={[{ text: 'Close', onClick: this.props.turnOffAlerts }]}
      >
        
      </BaseModal>
    );
  }
}

export default ErrorAlert;
