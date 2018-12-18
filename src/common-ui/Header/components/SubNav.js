import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import getSiteName from '../../../util/getSiteName';
import '../styles/sub-nav.scss';

class SubNav extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    const currentNavObj = this.props.links.find(link => '/' + getSiteName() === link.href);
    this.state = { url: currentNavObj ? currentNavObj.text : '' };
  }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ url: this.props.links.find(link => '/' + getSiteName() === link.href).text });
    }
  }

  render() {
    const permittedSites = this.props.user.data.permittedSites || [];
    const menuItemStyle = { padding: 0, paddingTop: '5px', height: '40px', outline: 'none' };
    const linkItemStyle = { padding: '0 20px', height: '100%', width: '100%', outline: 'none' };
    const links = this.props.links.filter(linkObj => permittedSites.includes(linkObj.href.slice(1)) || linkObj.href === '/');

    return (
      <div id="sub-nav">
        <Select
          value={this.state.url}
          inputProps={{
            name: 'url',
            id: 'navigation-select',
          }}
        >
          {
            links.map((link, index) => {
              return (
                <MenuItem value={link.text} key={'nav-select-item' + index} style={menuItemStyle}>
                  <Link to={link.href} style={linkItemStyle}>
                    {link.text}
                  </Link>
                </MenuItem>
              );
            })
          }
        </Select>
      </div>
    );
  }
}

export default SubNav;
