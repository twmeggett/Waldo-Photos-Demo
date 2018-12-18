import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class MobileMenu extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    links: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const permittedSites = this.props.user.data.permittedSites || [];
    const navLinksWithHome = [{ text: <img src={''} style={{ height: '20px' }} />, href: '/' }, ...this.props.links.filter(linkObj => permittedSites.includes(linkObj.href.slice(1)) || linkObj.href === '/')];
    return (
      <div id="mobile-menu-icon">
        <i className="fas fa-bars utility-icon" onClick={this.toggleDrawer} />
        <Drawer open={this.state.open} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
            style={{ minWidth: '12em' }}
          >
            {
              <div>
                <List component="nav">
                  {navLinksWithHome.map((link, index) => {
                    return (
                      <ListItem button key={'mobile-menu-list-item' + index}>
                        <Link to={link.href}>{link.text}</Link>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            }
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MobileMenu;
