import React from 'react';
import PropTypes from 'prop-types';
import UtilityBar from './UtilityBar';
import '../styles/header.scss';

let NAV_LINKS = [];

class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  state = {
    subLinks: [],
  }

  buildSubLinks() {
    this.setState({ subLinks: NAV_LINKS });
  }

  componentDidMount() {
    this.buildSubLinks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.buildSubLinks();
    }
  }

  render() {
    return (
      <div className="nav-utility">
        <UtilityBar location={this.props.location} user={this.props.user} links={this.state.subLinks} />
      </div>
    );
  }
}

export const addNavLinks = (linkObj) => {
  if (!NAV_LINKS.find(navLink => navLink.href === linkObj.href)) {
    NAV_LINKS = [
      ...NAV_LINKS,
      linkObj,
    ];
  }
};

export default Header;
