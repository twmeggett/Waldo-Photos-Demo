import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../common-ui/Select';
import Table from '../../../common-ui/Table';
import { getDict } from '../../../common-ui/I18n';
import { usDollarFormatter } from '../../../util/formatMoney';

const defaultState = {
  pizzaSizeDeets: {},
  formValues: {
    pizzaSize: '',
    toppings: [],
  },
};

class PizzaForm extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pizzas: PropTypes.array.isRequired,
    addPizza: PropTypes.func.isRequired,
    removePizza: PropTypes.func.isRequired,
    removeTopping: PropTypes.func.isRequired,
    showInfoAlert: PropTypes.func.isRequired,
    subTotal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.getPrice = this.getPrice.bind(this);
    this.updateFormValues = this.updateFormValues.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAddPizza = this.handleAddPizza.bind(this);
    this.handleToppingChange = this.handleToppingChange.bind(this);
    this.removePizza = this.removePizza.bind(this);
    this.removeTopping = this.removeTopping.bind(this);
  }

  getPrice(pizzaName, toppings) {
    const pizzaSizeDeets = this.props.data.find(pizzaSize => pizzaSize.name === pizzaName);
    const toppingPrices = toppings.map(topping => {
      const toppingDeets = pizzaSizeDeets.toppings.find(top => top.topping.name === topping);
      return toppingDeets.topping.price;
    });

    return toppings.length > 0 ? toppingPrices.reduce((total, num) => total + num) + pizzaSizeDeets.basePrice : pizzaSizeDeets.basePrice;
  }

  updateFormValues(field, value) {
    this.setState({ formValues: { ...this.state.formValues, [field]: value } });
    // Here we can perform validations
  }

  handleSizeChange(pizzaSize) {
    const pizzaSizeDeets = this.props.data.find(pizza => pizza.name === pizzaSize.value);
    const defaultToppings = pizzaSizeDeets.toppings.filter(topping => topping.defaultSelected).map(top => top.topping.name);

    this.setState({
      ...this.state,
      pizzaSizeDeets,
      formValues: {
        ...this.state.formValues,
        pizzaSize: pizzaSize.value,
        toppings: defaultToppings,
      },
    });
  }

  handleAddPizza() {
    let pizzaPrice = this.getPrice(this.state.pizzaSizeDeets.name, this.state.formValues.toppings);

    this.props.addPizza({
      pizzaSize: this.state.formValues.pizzaSize,
      toppings: this.state.formValues.toppings || [],
      price: pizzaPrice,
    });
  }

  handleToppingChange(toppingName) {
    const maxToppingsReached = this.state.pizzaSizeDeets.maxToppings ? this.state.formValues.toppings.length >= this.state.pizzaSizeDeets.maxToppings : false;
    const checked = this.state.formValues.toppings.includes(toppingName);
    const value = checked ? this.state.formValues.toppings.filter(topping => topping !== toppingName) : !maxToppingsReached ? [ ...this.state.formValues.toppings, toppingName ] : this.state.formValues.toppings;

    if (!checked && value.length >= this.state.pizzaSizeDeets.maxToppings) {
      this.props.showInfoAlert(getDict('home.form.maxToppingsTitle'), getDict('home.form.maxToppingsMsg'));
    }
    this.updateFormValues('toppings', value);
  }

  removePizza(index) {
    this.props.removePizza(index);
  }

  removeTopping(index, toppingName) {
    const selectedPizza = this.props.pizzas[index];
    const newToppings = selectedPizza.toppings.filter(topping => topping !== toppingName);
    const newPrice = this.getPrice(selectedPizza.pizzaSize, newToppings);

    this.props.removeTopping(index, newToppings, newPrice);
  }

  render() {
    const columns = [
      {
        Header: getDict('home.form.size'),
        accessor: 'pizzaSize',
        Cell: row => (
          <span>
            <p className="link">{ row.value } <i className="far fa-times-circle" style={{ color: 'red' }} onClick={() => {
              this.removePizza(row.index);
            }} /></p>
          </span>
        ),
        minWidth: 20,
        Footer: data => {
          return (
            <b>
              Total:
            </b>
          );
        },
      },
      {
        Header: getDict('home.form.toppings'),
        accessor: 'toppings',
        Cell: row => (
          <span>
            <p>{ row.value.map((topping, index) => (
              <span key={'diplayToppingTable' + index}>{topping} <i className="far fa-times-circle" style={{ marginRight: '10px', color: 'red' }} onClick={() => {
                this.removeTopping(row.index, topping);
              }} /></span>
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
          );
        },
        minWidth: 15,
        Footer: data => {
          return (
            <span>
              {usDollarFormatter(this.props.subTotal)}
            </span>
          );
        },
      },
    ];

    return (
      <div id="pizza-form">
        <b>{getDict('home.form.stepOne')}</b>
        <Select
          options={this.props.data.map(size => ({ value: size.name, label: `${size.name} - ${usDollarFormatter(size.basePrice)}` }))}
          onChange={this.handleSizeChange}
        />
        {
          this.state.formValues.pizzaSize && this.state.pizzaSizeDeets.toppings ? (
            <div className="topping">
              <hr />
              <b>{getDict('home.form.stepTwo')}</b>
              <span className={this.state.pizzaSizeDeets.maxToppings ? '' : 'hide'}>
                <small style={{ fontStyle: 'italic' }}> {this.state.pizzaSizeDeets.maxToppings - this.state.formValues.toppings.length} {getDict('home.form.toppingsLeft')}</small>
              </span>
              <span className={this.state.pizzaSizeDeets.maxToppings ? 'hide' : ''}>
                <small style={{ fontStyle: 'italic' }}> {getDict('home.form.alltheToppings')}</small>
              </span>

              {this.state.pizzaSizeDeets.toppings.map((topping, index) => {
                const toppingSelected = this.state.formValues.toppings.find(top => top === topping.topping.name);

                return (
                  <div className="form-group form-check" onClick={() => this.handleToppingChange(topping.topping.name)} key={'topping-' + topping.topping.name}>
                    <input
                      type="checkbox"
                      checked={toppingSelected}
                      disabled={!toppingSelected && this.state.pizzaSizeDeets.maxToppings && this.state.formValues.toppings.length >= this.state.pizzaSizeDeets.maxToppings}
                    />
                    <label>{topping.topping.name} - {usDollarFormatter(topping.topping.price)} <small style={{ fontStyle: 'italic' }}>{ topping.defaultSelected ? `- ${getDict('home.form.defaultTopping')}` : '' }</small></label>
                  </div>
                );
              })}
            </div>
          ) : undefined
        }
        <button onClick={() => { this.handleAddPizza(); }} disabled={!this.state.pizzaSizeDeets.name}>
          {getDict('home.form.submit')}
        </button>
        <div>
          <hr />
          <Table
            data={this.props.pizzas || []}
            columns={columns}
            isFetching={this.props.isFetching}
            showPagination={false}
          />
        </div>
      </div>
    );
  }
}

export default PizzaForm;
