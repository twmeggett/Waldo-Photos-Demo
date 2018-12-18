import React from 'react';

import './loadingIcon.scss';

class LoadingIcon extends React.Component {
  render() {
    return (
      <section id="loading-icon">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </section>
    );
  }
}

export default LoadingIcon;
