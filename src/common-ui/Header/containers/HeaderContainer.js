import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  location: state.location,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
