import moment from 'moment';
import 'moment/locale/th';

const momentUtil = {
  competitionTime: (startDate, endDate) => {
    const newDate = moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm');
    const timeBefore = moment(newDate).isBefore(startDate);
    const timeAfter = moment(newDate).isAfter(endDate);
    return { isBefore: timeBefore, isAfter: timeAfter }
  },
  timeExpired: (date) => {
    const newDate = moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm');
    const expried = Math.sign(moment(date).diff(newDate)) == '-1';
    if (expried) {
      return true;
    } else {
      return false;
    }
  },
};

export default momentUtil;
