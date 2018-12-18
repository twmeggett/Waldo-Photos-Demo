import React from 'react';
import PropTypes from 'prop-types';
import AuthFailedView from './AuthFailedView';
import LoadingIcon from '../../LoadingIcon';
import { setLang } from '../../Amplify/api';
import getSiteName from '../../../util/getSiteName';

class AuthWrapper extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = { userPermitted: false };
    this.displayNode = this.displayNode.bind(this);
    this.checkIfPermitted = this.checkIfPermitted.bind(this);
  }

  displayNode(childNodes) {
    if (!this.props.user.initialized) {
      return <LoadingIcon />;
    }

    return this.state.userPermitted ? childNodes : <AuthFailedView />;
  }

  checkIfPermitted() {
    const { id, email, permittedSites, lang } = this.props.user.data;

    if (id && email) {
      const siteName = getSiteName();
      if (lang) {
        setLang(lang);
      }
      this.setState({ userPermitted: siteName ? permittedSites.includes(siteName) : true });
    }
  }

  componentDidMount() {
    if (!this.props.user.isFetching && !this.props.user.initialized) {
      this.props.fetchUser();
    }
    this.checkIfPermitted();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isFetching && !this.props.user.isFetching) {
      this.checkIfPermitted();
    }
    if (!prevProps.user.email && this.props.user.email) {
      this.checkIfPermitted();
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.checkIfPermitted();
    }
  }

  render() {
    return (
      <div id="auth-wrapper">
        {this.displayNode(this.props.children)}
      </div>
    );
  }
}

export default AuthWrapper;
