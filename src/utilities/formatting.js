import Timespan from "readable-timespan";
import moment from 'moment';

export default function formatToQuickReadTimespan(datetimestring) {

  const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

  const datetime = new Date(datetimestring);
  const now = new Date();
  const diffMs = now.getTime() - datetime.getTime();

  if (diffMs < ONE_YEAR_MS) {
    const timespan = new Timespan();
    const quickReadTimespan = timespan.parse(diffMs);
    return `${quickReadTimespan} ago`;
  } else {
    return `on ${moment(datetimestring).format('MMM DD, YYYY')}`;
  }

};