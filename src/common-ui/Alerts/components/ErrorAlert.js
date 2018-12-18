import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import BaseModal from './BaseModal';
import { getDict } from '../../I18n';

class ErrorAlert extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    alertMsg: PropTypes.string.isRequired,
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
        <DialogContentText id="alert-dialog-description">
          {this.props.alertMsg}
        </DialogContentText>
      </BaseModal>
    );
  }
}

export default ErrorAlert;
