import React from 'react';
import PropTypes from 'prop-types';
import PizzaForm from './PizzaForm';
import PageWidth from '../../../layouts/PageWidth';
import { getDict } from '../../../common-ui/I18n';
import '../styles/home.scss';

class HomeView extends React.Component {
  static propTypes = {
    // user: PropTypes.object,
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    initialized: PropTypes.bool,
    fetchPizzaData: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPizzaData();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.initialized && !this.props.isFetching) {
      this.props.fetchPizzaData();
    }
  }

  render() {
    return (
      <div id="home">
        <PageWidth>
        	<h1>{getDict('home.welcome')}</h1>
        	<PizzaForm  {...this.props} />
        </PageWidth>
      </div>
    );
  }
}

export default HomeView;
