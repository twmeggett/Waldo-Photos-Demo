import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectInput extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    placeholder: PropTypes.string,
  }

  render() {
    return (
      <Select
        options={this.props.options}
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder={this.props.placeholder}
        {...this.props}
      />
    );
  }
}

export default SelectInput;
