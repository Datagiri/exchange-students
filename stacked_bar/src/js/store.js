import { createStore } from 'redux';
import reducer from './reducers/index';
import middleware from './middleware';

import { graphTypes } from './global';

const store = createStore(
  reducer,
  {
    stackData: {
      raw: [
        // Program, Department, Count, ID, Program cumulative, Department cumulative
        ['Bachelors', 'Aerospace', 3, 1, 3, 3],
        ['Bachelors', 'Chemical', 10, 2, 13, 10],
        ['Bachelors', 'Civil', 7, 3, 20, 7],
        ['Bachelors', 'Comp Science', 5, 4, 25, 5],
        ['Bachelors', 'Electrical', 12, 5, 37, 12],
        ['Bachelors', 'Mechanical', 9, 6, 46, 9],
        ['Bachelors', 'Metallurgy', 2, 7, 48, 2],
        ['Bachelors', 'Physics', 4, 8, 52, 4],
        ['Dual degree', 'Aerospace', 9, 9, 9, 12],
        ['Dual degree', 'Chemical', 8, 10, 17, 18],
        ['Dual degree', 'Others', 2, 11, 19, 2],
        ['Dual degree', 'Civil', 5, 12, 24, 12],
        ['Dual degree', 'Comp Science', 6, 13, 30, 11],
        ['Dual degree', 'Electrical', 39, 14, 69, 51],
        ['Dual degree', 'Energy', 15, 15, 84, 15],
        ['Dual degree', 'Mechanical', 34, 16, 118, 43],
        ['Dual degree', 'Metallurgy', 6, 17, 124, 8],
        ['Dual degree', 'Physics', 2, 18, 126, 6],
        ['Masters', 'Others', 1, 19, 1, 3],
        ['Masters', 'Civil', 1, 20, 2, 13],
        ['Masters', 'Electrical', 1, 21, 3, 52],
        ['Masters', 'Others', 2, 22, 5, 5],
        ['Masters', 'Design', 4, 23, 9, 4],
        ['Masters', 'Mechanical', 1, 24, 10, 44],
        ['Masters', 'Management', 11, 25, 21, 11],
        ['PhD', 'Others', 2, 26, 2, 7],
        ['PhD', 'Others', 1, 27, 3, 8],
        ['PhD', 'Energy', 2, 28, 5, 17],
        ['PhD', 'Others', 1, 29, 6, 9],
      ],
      groupBy: graphTypes.department,
    },
  },
  middleware,
);
export default store;
