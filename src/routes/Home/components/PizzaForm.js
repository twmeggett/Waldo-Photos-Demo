import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../common-ui/Select';
import Table from '../../../common-ui/Table';
import { getDict } from '../../../common-ui/I18n';
import { usDollarFormatter } from '../../../util/formatMoney';
import '../styles/home.scss';

class PizzaForm extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pizzas: PropTypes.array.isRequired,
    addPizza: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      pizzaSizeDeets: {},
      formValues: {
        pizzaSize: '',
        toppings: [],
      },
      total: 0,
    };
    this.updateFormValues = this.updateFormValues.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAddPizza = this.handleAddPizza.bind(this);
    this.handleToppingChange = this.handleToppingChange.bind(this);
    this.removePizza = this.removePizza.bind(this);
  }

  componentDidMount() {
    if (!this.props.initialized && !this.props.isFetching) {
      this.props.fetchPizzaData();
    }
  }

  updateFormValues(field, value) {
    this.setState({ formValues: { ...this.state.formValues, [field]: value } });
    // Here we can perform validations
  }

  handleSizeChange(pizzaSize) {
    const pizzaSizeDeets = this.props.data.find(pizza => pizza.name === pizzaSize.value);
    const defaultToppings = pizzaSizeDeets.toppings.filter(topping => topping.defaultSelected).map(top => top.topping.name)

    this.setState({
      ...this.state,
      pizzaSizeDeets,
      formValues: {
        pizzaSize: pizzaSize.value,
        toppings: defaultToppings,
      }
    });
  }

  handleAddPizza() {
    let pizzaPrice = 0;
    const pizzaSizeDeets = this.props.data.find(pizza => pizza.name === this.state.pizzaSizeDeets.name);
    const toppingPrices = this.state.formValues.toppings.map(topping => {
      const toppingDeets = pizzaSizeDeets.toppings.find(top => top.topping.name === topping);
      return toppingDeets.topping.price;
    });

    pizzaPrice = this.state.formValues.toppings.length > 0 ? toppingPrices.reduce((total, num) => total + num) + pizzaSizeDeets.basePrice : pizzaSizeDeets.basePrice;

    this.props.addPizza({
      pizzaSize: this.state.formValues.pizzaSize,
      toppings: this.state.formValues.toppings || [],
      price: pizzaPrice,
    });
    this.setState({ total: this.state.total + pizzaPrice});
  }

  handleToppingChange(toppingName) {
    const maxToppingsReached = this.state.pizzaSizeDeets.maxToppings ? this.state.formValues.toppings.length >= this.state.pizzaSizeDeets.maxToppings : false;
    const checked = this.state.formValues.toppings.find(topping => topping === toppingName) ? true : false;
    const value = checked ? this.state.formValues.toppings.filter(topping => topping !== toppingName) : !maxToppingsReached ? [ ...this.state.formValues.toppings, toppingName ] : this.state.formValues.toppings;
    
    this.updateFormValues('toppings', value);
  }

  removePizza(index) {
    this.setState({ total: this.state.total - this.props.pizzas[index].price});
    this.props.removePizza(index);
  }

  render() {
    const columns = [
      {
        Header: getDict('home.form.size'),
        accessor: 'pizzaSize',
        Cell: row => (
          <span>
            <p className="link">{ row.value } <i className="far fa-times-circle" style={{  marginLeft: '10px', color: 'red' }} onClick={ () => {
              this.removePizza(row.index)
            }}></i></p>
          </span>
        ),
        minWidth: 20,
      },
      {
        Header: getDict('home.form.toppings'),
        accessor: 'toppings',
        Cell: row => (
          <span>
            <p>{ row.value.map((topping, index) => (
              <span key={'diplayToppingTable' + index}>{topping} </span>
            )) }</p>
          </span>
        ),
      },
      {
        Header: getDict('home.form.price'),
        accessor: 'price',
        Cell: row => {
          return (
            <span>
              <p>{ usDollarFormatter(row.value) }</p>
            </span>
          )
        },
        minWidth: 15,
        Footer: data => {
          return (
            <span>
              {usDollarFormatter(this.state.total)}
            </span>
            )
        }
      },
    ];

    return (
      <div id="pizza-form">
        <b>{getDict('home.form.stepOne')}</b>
        <Select
          options={this.props.data.map(size => ({ value: size.name, label: `${size.name} - ${usDollarFormatter(size.basePrice)}` }))}
          onChange={this.handleSizeChange}
        />
        <hr />
        {
          this.state.formValues.pizzaSize && this.state.pizzaSizeDeets.toppings ? (
            <div>
              <b>{getDict('home.form.stepTwo')}</b>
              {this.state.pizzaSizeDeets.toppings.map((topping, index) => (
                <div className="form-group form-check" onChange={ () => this.handleToppingChange(topping.topping.name) } key={'topping-' + topping.topping.name}>
                  <input
                    type="checkbox"
                    checked={this.state.formValues.toppings.find(top => top === topping.topping.name) ? true : false}
                    disabled={!this.state.formValues.toppings.find(top => top === topping.topping.name) && ( this.state.pizzaSizeDeets.maxToppings ? this.state.formValues.toppings.length >= this.state.pizzaSizeDeets.maxToppings : false) ? true : false}
                  />
                  <label>{topping.topping.name} - {usDollarFormatter(topping.topping.price)}</label>
                </div>
              ))}
            </div>
          ) : undefined
        }
        <button onClick={() => { this.handleAddPizza() }} disabled={!this.state.pizzaSizeDeets.name}>
          {getDict('home.form.submit')}
        </button>
        <hr />
        <Table
          data={this.props.pizzas || []}
          columns={columns}
          isFetching={this.props.isFetching}
        />
      </div>
    );
  }
}

export default PizzaForm;
