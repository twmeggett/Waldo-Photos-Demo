import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getDict } from '../I18n';
import './styles/backButton.scss';

class BackButton extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onBackClick = this.onBackClick.bind(this);
  }

  onBackClick(event) {
    this.props.router.goBack();
  };

  render() {
    return (
      <div className="backButton link" onClick={this.onBackClick}>
        <span style={{ display: 'inline-block' }}><i className="fa fa-arrow-left" aria-hidden="true" /></span>
        <span style={{ display: 'inline-block', marginLeft: '12px' }} className="text">{getDict('nav.back')}</span>
      </div>
    );
  }
}

export default withRouter(BackButton);
