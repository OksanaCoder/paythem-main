import moment from 'moment';

import strings from 'translations';

const DATE_RANGE = [
  {
    id: 1,
    label: strings.config.today,
    name: 'today',
    range: {
      from: moment().startOf('days'),
      to: moment().endOf('day'),
    },
  },
  {
    id: 2,
    label: strings.config.yesterday,
    name: 'yesterday',
    range: {
      from: moment()
        .subtract(1, 'days')
        .startOf('day'),
      to: moment()
        .subtract(1, 'days')
        .endOf('day'),
    },
  },
  {
    id: 3,
    label: strings.config.last_week,
    name: 'last_week',
    range: {
      from: moment()
        .subtract(1, 'week')
        .startOf('week')
        .add(1, 'days'),
      to: moment()
        .subtract(1, 'week')
        .endOf('week')
        .add(1, 'days'),
    },
  },
  {
    id: 4,
    label: strings.formatString(strings.config.last_days, { num: 7 }),
    name: 'last_7_days',
    range: {
      from: moment()
        .subtract(7, 'd')
        .startOf('days'),
      to: moment()
        .add(-1, 'days')
        .endOf('days'),
    },
  },
  {
    id: 5,
    label: strings.formatString(strings.config.last_days, { num: 30 }),
    name: 'last_30_days',
    range: {
      from: moment()
        .subtract(30, 'd')
        .startOf('days'),
      to: moment()
        .add(-1, 'days')
        .endOf('days'),
    },
  },
  {
    id: 6,
    label: strings.config.this_month,
    name: 'this_month',
    range: {
      from: moment().startOf('month'),
      to: moment()
        .add(-1, 'days')
        .endOf('days'),
    },
  },
  {
    id: 7,
    label: strings.config.last_month,
    name: 'last_month',
    range: {
      from: moment()
        .subtract(1, 'month')
        .startOf('month'),
      to: moment()
        .subtract(1, 'month')
        .endOf('month'),
    },
  },
];

export default DATE_RANGE;
