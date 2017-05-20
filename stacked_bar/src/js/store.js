import { createStore } from 'redux';
import reducer from './reducers/index';
import middleware from './middleware';

import { graphTypes } from './global';

const store = createStore(
  reducer,
  {
    stackData: {
      raw: [
        ['Bachelors', 'Aerospace', 3],
        ['Bachelors', 'Chemical', 10],
        ['Bachelors', 'Civil', 7],
        ['Bachelors', 'Comp Science', 5],
        ['Bachelors', 'Electrical', 12],
        ['Bachelors', 'Mechanical', 9],
        ['Bachelors', 'Metallurgy', 2],
        ['Bachelors', 'Physics', 4],
        ['Dual degree', 'Aerospace', 9],
        ['Dual degree', 'Chemical', 8],
        ['Dual degree', 'Others', 2],
        ['Dual degree', 'Civil', 5],
        ['Dual degree', 'Comp Science', 6],
        ['Dual degree', 'Electrical', 39],
        ['Dual degree', 'Energy', 15],
        ['Dual degree', 'Mechanical', 34],
        ['Dual degree', 'Metallurgy', 6],
        ['Dual degree', 'Physics', 2],
        ['Masters', 'Others', 1],
        ['Masters', 'Civil', 1],
        ['Masters', 'Electrical', 1],
        ['Masters', 'Others', 2],
        ['Masters', 'Design', 4],
        ['Masters', 'Mechanical', 1],
        ['Masters', 'Management', 11],
        ['PhD', 'Others', 2],
        ['PhD', 'Others', 1],
        ['PhD', 'Energy', 2],
        ['PhD', 'Others', 1],
      ],
      groupBy: graphTypes.department,
    }
  },
  middleware,
);
export default store;
