import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

class MenuComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <span style={{ cursor: 'pointer' }}>
        <span
          aria-owns={this.state.anchorEl ? this.props.name : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.children}
        </span>
        <Menu
          id={this.props.name}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          style={{ padding: 0 }}
        >
          {this.props.items.map((item, index) => {
            if (item.type === 'divider') {
              return <Divider light key={this.props.name + index} />;
            }
            return <MenuItem onClick={item.onClick} key={this.props.name + index}>{item.text}</MenuItem>;
          })}
        </Menu>
      </span>
    );
  }
}

export default MenuComponent;
