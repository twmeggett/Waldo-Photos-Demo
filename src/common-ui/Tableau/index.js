import React from 'react';
import PropTypes from 'prop-types';
import './tableau.scss';

class TableauWrapper extends React.Component {
  static propTypes = {
    sheetUrl: PropTypes.string.isRequired,
    sheetOpts: PropTypes.shape({
      hideTabs: PropTypes.bool,
      hideToolbar: PropTypes.bool,
      width: PropTypes.string,
      height: PropTypes.string,
      onFirstInteractive: PropTypes.func,
    }),
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = { apiLoaded: false };
  }

  render() {
    return (
      <section className="tableau-embed">
        <iframe src={this.props.sheetUrl} style={this.props.style} />
      </section>
    );
  }
}

export default TableauWrapper;
