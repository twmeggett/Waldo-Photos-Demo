import React from 'react';
import PropTypes from 'prop-types';
import './page-width.scss';

export let PageWidth = ({ children, fullWidth }) => (
  <div className={fullWidth ? '' : 'page-width'}>
    {children}
  </div>
);

PageWidth.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default PageWidth;
