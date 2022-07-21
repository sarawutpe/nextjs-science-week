import moment from 'moment';
import 'moment/locale/th';
import currency from 'currency.js';

const formatter = {
  momentLocal: (date) => {
    let newMoment = moment(date).add(543, 'year').format('LLL น.');
    return newMoment;
  },
  momentLLL: (date) => {
    let newMoment = moment(date).add(543, 'year').format('LLL น.');
    return newMoment;
  },
  momentShort: (date) => {
    let newMoment = moment(date ? date : Date.now()).add(543, 'year').format('l LT น.');
    return newMoment;
  },
  thb: (value) => {
    return currency(value, { symbol: "฿", precision: 2 }).format();
  },

};

export default formatter;
