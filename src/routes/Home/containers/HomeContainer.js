import { connect } from 'react-redux';
import { fetchPizzaData, addPizza, removePizza } from '../reducers/home'
import HomeView from '../components/HomeView';

const mapStateToProps = state => ({
  data: state.home.data,
  isFetching: state.home.isFetching,
  initialized: state.home.initialized,
  pizzas: state.home.pizzas,
});

const mapDispatchToProps = dispatch => ({
  fetchPizzaData: () => {
    dispatch(fetchPizzaData());
  },
  addPizza: (pizza) => {
    dispatch(addPizza(pizza));
  },
  removePizza: (index) => {
    dispatch(removePizza(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
