import React from 'react';
import { Link } from 'react-router';
import PageWidth from '../../../layouts/PageWidth';

class AuthFailedView extends React.Component {
  render() {
    return (
      <div id="auth-failed">
        <PageWidth>
          <h1>You do not have Permission to view this site</h1>
          <p>Please click <Link to="/">here</Link> to learn how to get access to this site</p>
        </PageWidth>
      </div>
    );
  }
}

export default AuthFailedView;
