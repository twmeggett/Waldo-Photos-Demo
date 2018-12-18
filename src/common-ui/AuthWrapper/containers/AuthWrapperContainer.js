import { connect } from 'react-redux';
import AuthWrapper from '../components/AuthWrapperView';
import { fetchUser } from '../../../store/user';

const mapStateToProps = state => ({
  location: state.location,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser() {
    dispatch(fetchUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
