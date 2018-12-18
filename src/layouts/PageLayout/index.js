import React from 'react';
import PropTypes from 'prop-types';
// import Header from '../../common-ui/Header/containers/HeaderContainer';
// import AuthWrapper from '../../common-ui/AuthWrapper/containers/AuthWrapperContainer';
import './page-layout.scss';

class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        <div className="page-layout__viewport">
          {/* <AuthWrapper> */}
            {this.props.children}
          {/* </AuthWrapper> */}
        </div>
      </div>
    );
  }
}

export default PageLayout;
