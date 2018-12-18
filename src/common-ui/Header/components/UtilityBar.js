import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MobileMenu from './MobileMenu';
import SubNav from './SubNav';
import UserIcon from './UserIcon';
import PageWidth from '../../../layouts/PageWidth';
import '../styles/utility-bar.scss';

class UtilityBar extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object,
    links: PropTypes.array,
  }

  render() {
    return (
      <div id="utility-bar">
        <MobileMenu user={this.props.user} links={this.props.links} />
        <div id="logo-link">
          <Link to={'/'}>
            <p>Home</p>
          </Link>
        </div>
        <div className="header-right">
          {
            this.props.links.length > 0 ? <SubNav location={this.props.location} user={this.props.user} links={this.props.links} /> : null
          }
          <UserIcon user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default UtilityBar;
