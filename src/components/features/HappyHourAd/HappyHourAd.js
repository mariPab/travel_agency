import React from 'react';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  }
  getCountdownTime () {
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >=12) {
      nextNoon.setUTCDate(currentTime.getUTCDate() + 1);
    }
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }
  render() {
    const { title } = this.props;
    return (
      <div>
        <h3 className={'title'}>{title}</h3>
        <p className={'promoDescription'}>{this.getCountdownTime()}</p>
      </div>
    );
  }


}
export default HappyHourAd;
