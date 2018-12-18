import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class BaseModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })).isRequired,
    children: PropTypes.node.isRequired,
    onEnterKeyDown: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.modalKeyDown = this.modalKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      // remove focus from everything else
      document.addEventListener('keydown', this.modalKeyDown);
    } else if (prevProps.open && !this.props.open) {
      document.removeEventListener('keydown', this.modalKeyDown);
    }
  }

  modalKeyDown(e) {
    if (e.key === 'Enter') {
      if (typeof this.props.onEnterKeyDown === 'function') {
        this.props.onEnterKeyDown();
      } else if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      // Older browsers may send 'Esc' instead of 'Escape'
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
    }

    return false;
  }

  render() {
    return (
      <div id="alert-modal-content" tabIndex="1">
        <Dialog
          open={this.props.open}
          onClose={this.onClose}
          style={{ minWidth: '250px' }}
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            {this.props.children}
          </DialogContent>
          <DialogActions>
            {this.props.actions.map((action, index) => {
              return (
                <Button onClick={action.onClick} color="primary" key={'alert-action' + index}>
                  {action.text}
                </Button>
              );
            })}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default BaseModal;
