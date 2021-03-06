import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';

import OrderSummary from '../../features/OrderSummary/OrderSummary';
import OrderOption from '../../features/OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { Row, Col} from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';
import settings from '../../../data/settings.js';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import { discountPrice } from '../../../utils/discountPrice';

const sendOrder = (trip, options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...trip,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({trip, options, tripCost, setOrderOption}) => {
  const isEnabled = options.name.length > 3 && options.contact.length > 8;
  const timeUTC = new Date(new Date().toUTCString().substr(0, 25));
  return (
    <Row className={styles.component}>
      {pricing.map(option => (
        <Col key={option.id} md={6}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      )
      )}
      <Col xs={12}>
        <OrderSummary cost={timeUTC.getHours() == 12 ? formatPrice(discountPrice(tripCost, 20)): tripCost} options={options} />
        <Button disabled={!isEnabled} onClick={() => sendOrder(trip, options, tripCost)}>Order Now!</Button>
      </Col>
    </Row>
  );

};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  trip: PropTypes.object,
};

export default OrderForm;
