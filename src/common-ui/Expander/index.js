import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpandMoreIcon = () => (
  <i className="fas fa-angle-up" />
);

class ExpanderItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
  }

  render() {
    const panelStyle = {
      padding: 0,
      borderBottom: '1px solid grey',
    };

    const panelDetailStyle = {
      width: '100%',
      padding: '8px 24px 24px',
    };

    return (
      <ExpansionPanelDetails style={panelStyle}>
        <div style={panelDetailStyle} className="link" onClick={this.props.item.onClick}>{this.props.item.text}</div>
      </ExpansionPanelDetails>
    );
  }
};

class Expander extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }

  render() {
    return (
      <ExpansionPanel>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {this.props.title}
        </ExpansionPanelSummary>

        {this.props.items.map((item, index) => (
          <ExpanderItem item={item} key={this.props.title + 'expanderItem' + index} />
        ))}

      </ExpansionPanel>
    );
  }
}

export default Expander;
