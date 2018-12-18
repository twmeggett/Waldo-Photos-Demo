import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../Menu';
import { getDict } from '../../I18n/';

class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const items = [{ text: this.props.user.data.username }, { type: 'divider' }, { text: getDict('header.signOut'), onClick: () => alert('Signed Out') }];

    return (
      <Menu name="user-icon-menu" items={items}>
        <div id="user-icon"><i className="fas fa-user-circle utility-icon" /></div>
      </Menu>
    );
  }
}

export default UserIcon;
